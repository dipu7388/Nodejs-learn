/* eslint-disable quote-props */
/* eslint-disable no-console */
const request = require('request');
const http = require('https');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
function dialogController(Dialog) {
  function post(request, response) {
    // console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
    // console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);
    console.log('BODY');
    response.setHeader('Content-Type', 'application/json');
    // const agent = new WebhookClient({ request, response });
    const agent = new WebhookClient({ request, response });

    try {
      const { action } = request.body.queryResult;
      if (action !== 'input.contact') {
        response.send(buildChatResponse(`I'm sorry, I don't know this${action}`));
        console.log(`Agent is ${JSON.stringify(agent)}`);
        return;
      }else{
      let x= new Suggestion('my suggestions');
      response.send( agent.response(x));
      }
    } catch (error) {

      let x= new Suggestion('my suggestions');
      // response.send( buildChatResponse("Not a Dialog Flow v2 request"+ JSON.stringify(x)));
      response.send( agent.response(x));

    }
  
    const { parameters } = request.body.queryResult;
  
    const enquiryModel = {};
    enquiryModel.companyId = '3';
    enquiryModel.personName = parameters['given-name'];
    enquiryModel.eamilAddress = parameters.email;
    enquiryModel.contactNumber = parameters['phone-number'];
    enquiryModel.enquiryType = 2;
    submitEnquery(enquiryModel, response);
    response.send(enquiryModel)
    response.status(201);
    return response.json(dialog);
  }
  function get(request, response) {
    const agent = new WebhookClient({ request, response });
    console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);
    // console.log(`Agent is ${JSON.stringify(agent)}`)
    console.log('BODY');
    const { action } = request.body.queryResult;
    agent.action=action;
    response.setHeader('Content-Type', 'application/json');
    if (agent.action !== 'input.contact') {
      response.send(buildChatResponse(`I'm sorry, I don't know this${agent.action}`));
      return;
    }
  
    const { parameters } = request.body.queryResult;
    agent.parameters=parameters;
    const enquiryModel = {};
    enquiryModel.companyId = '3';
    enquiryModel.personName = agent.parameters['given-name'];
    enquiryModel.eamilAddress = agent.parameters.email;
    enquiryModel.contactNumber = agent.parameters['phone-number'];
    enquiryModel.enquiryType = 2;
    submitEnquery(enquiryModel, response);
    response.send(enquiryModel)
  }
  return { post, get };
}



function submitEnquery(enquiryModel, cloudFnResponse) {
  console.log(`Company enquery Model: ${JSON.stringify(enquiryModel)}`);

  const options = {
    method: 'POST',
    url: 'https://service.lsnetx.com/add/enquiry',
    headers:
    {
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate',
      Host: 'service.lsnetx.com',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body:
    {
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
  return JSON.stringify({ speech: chat, displayText: chat });
}

module.exports = dialogController;
