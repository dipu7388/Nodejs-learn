/* eslint-disable quote-props */
/* eslint-disable no-console */
const request = require('request');
const http = require('https');
const {
  WebhookClient
} = require('dialogflow-fulfillment');
const {testAgent }= require("../functions/test.function");
const {contactUs} = require("../functions/contactus");
const {
  Card,
  Suggestion
} = require('dialogflow-fulfillment');

function dialogController(Dialog) {
  function post(request, response) {
    // console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
    // console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);
    console.log('BODY');
    response.setHeader('Content-Type', 'application/json');
    try {
      const agent = new WebhookClient({
        request,
        response
      });
      let intentMap = new Map();
      intentMap.set('test', testAgent1);
      intentMap.set('lsnetx.contact-us', contactUs);
      // intentMap.set('your intent name here', googleAssistantHandler);
      agent.handleRequest(intentMap);
    } catch (error) {
      response.send(buildChatResponse(`I'm sorry, I don't know this ${error}`));
    }
  }

  function get(request, response) {
    const agent = new WebhookClient({
      request,
      response
    });
    console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);
    // console.log(`Agent is ${JSON.stringify(agent)}`)
    console.log('BODY');
    const {
      action
    } = request.body.queryResult;
    agent.action = action;
    response.setHeader('Content-Type', 'application/json');
    if (agent.action !== 'input.contact') {
      response.send(buildChatResponse(`I'm sorry, I don't know this${agent.action}`));
      return;
    }

    const {
      parameters
    } = request.body.queryResult;
    agent.parameters = parameters;
    const enquiryModel = {};
    enquiryModel.companyId = '3';
    enquiryModel.personName = agent.parameters['given-name'];
    enquiryModel.eamilAddress = agent.parameters.email;
    enquiryModel.contactNumber = agent.parameters['phone-number'];
    enquiryModel.enquiryType = 2;
    submitEnquery(enquiryModel, response);
    response.send(enquiryModel)
  }
  return {
    post,
    get
  };
}

function testAgent1(agent) {
  console.log('I didnt understand');
  
   agent.add(`I didn't understand`);
   agent.add(`I'm sorry, can you try again?`);
 }

function submitEnquery(enquiryModel, cloudFnResponse) {
  console.log(`Company enquery Model: ${JSON.stringify(enquiryModel)}`);

  const options = {
    method: 'POST',
    url: 'https://service.lsnetx.com/add/enquiry',
    headers: {
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate',
      Host: 'service.lsnetx.com',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: {
      companyId: '3',
      contactNumber: 9898989898,
      emailAddress: 'aaaa7388@gmail.com',
      enquiryType: 3,
      feedback: 'hiii this',
      personName: 'TEst'
    },
    json: true
  };
  request(options, (error, response, body) => {
    if (error) {
      const chat = `Error${error}`;
      cloudFnResponse.send(buildChatResponse(chat));
    }

    console.log(JSON.stringify(response));
    const chat = 'Your request seccessfully sent to our experts';
    cloudFnResponse.send(buildChatResponse(chat));
  });
}

 function buildChatResponse(chat) {
  return JSON.stringify({
    speech: chat,
    displayText: chat
  });
}

  function fallback(agent) {
  agent.add(`I didn't understand`);
  agent.add(`I'm sorry, can you try again?`);
}


module.exports = dialogController;