/* eslint-disable no-use-before-define */


const http = require('https');
const request = require('request');
const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);

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
});


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
  //  let req = http.request(options, (res) => {
  //     var chunks = [];

  //     res.on("data", function (chunk) {
  //       chunks.push(chunk);
  //     });

  //     res.on("end", function () {
  //       var body = Buffer.concat(chunks);
  //       console.log(body.toString());
  //     });
  //   });

  //   req.write(JSON.stringify({
  //    companyId: '3',
  //     contactNumber: 9898989898,
  //     emailAddress: 'aaaa7388@gmail.com',
  //     enquiryType: 3,
  //     feedback: 'hiii this',
  //     personName: 'TEst';
  //   }));
  //   req.end();

  //   let req = http.request(options, (res) => {
  //       var chunks = [];
  //       res.on("data", function (chunk) {
  //         console.log("Received json response: " + chunk);
  //         chunks.push(chunk);
  //       });
  //       res.on("end", function () {
  //         var body = Buffer.concat(chunks);
  //         console.log(body.toString());
  //         var chat="Your request seccessfully sent to our experts";
  //         cloudFnResponse.send(buildChatResponse(chat));
  //       });
  //     });

//   req.write(JSON.stringify(enquiryModel));
//   req.end();
}

function buildChatResponse(chat) {
  return JSON.stringify({ speech: chat, displayText: chat });
}
