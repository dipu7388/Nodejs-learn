/* eslint-disable quote-props */
/* eslint-disable no-console */
const request = require('request');
const http = require('https');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
function dialogController(Dialog) {
  function post(req, res) {
    const dialog = new Dialog(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    dialog.save();
    res.status(201);
    return res.json(dialog);
  }
  function get(request, response) {
    // const agent = new WebhookClient({ request, response });
    console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);
    // console.log(`Agent is ${JSON.stringify(agent)}`)
    console.log('BODY');
    const { action } = request.body.queryResult;
    response.setHeader('Content-Type', 'application/json');
    if (action !== 'input.contact') {
      response.send(buildChatResponse(`I'm sorry, I don't know this${action}`));
      return;
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

    // const options = {
    //   method: 'POST',
    //   url: 'https://service.lsnetx.com/add/enquiry',
    //   headers:
    //   {
    //     'cache-control': 'no-cache',
    //     Connection: 'keep-alive',
    //     'Accept-Encoding': 'gzip, deflate',
    //     Host: 'service.lsnetx.com',
    //     'Cache-Control': 'no-cache',
    //     Accept: '*/*',
    //     'Content-Type': 'application/json'
    //   },
    //   body:
    //   {
    //     companyId: '3',
    //     contactNumber: 9898989898,
    //     emailAddress: 'aaaa7388@gmail.com',
    //     enquiryType: 3,
    //     feedback: 'hiii this',
    //     personName: 'TEst'
    //   },
    //   json: true
    // };
    // // eslint-disable-next-line consistent-return
    // request(options, (error, response, body) => {
    //   if (error) {
    //     return res.send(error);
    //   }
    //   console.log(JSON.stringify(response));
    //   res.send(JSON.stringify(body));
    // });
    // // Dialog.find(query, (err, dialogs) => {
    // //   if (err) {
    // //     return res.send(err);
    // //   }
    // //   return res.json(dialogs);
    // // });
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
