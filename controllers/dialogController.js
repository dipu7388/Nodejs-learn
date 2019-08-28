/* eslint-disable quote-props */
/* eslint-disable no-console */
const request = require('request');
const http = require('https');
const {
  WebhookClient
} = require('dialogflow-fulfillment');
const testAgent = require("../functions/test.function");
const contactUs = require("../functions/contactus");
const initializeFun = require("../functions/initialize");
const welcomeFun = require("../functions/welcome");
const serviceFun= require("../functions/service");
const triggerConFun= require("../functions/trigger-contactus");
const fallbackFun= require("../functions/fallback");
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
      // const agent=new Object();
      console.log(agent.originalRequest);
      
      let intentMap = new Map();
      intentMap.set('test', testAgent);
      intentMap.set('lsnetx.contact-us', contactUs);
      intentMap.set('initialize',initializeFun);
      intentMap.set('welcome', welcomeFun);
      intentMap.set('services',serviceFun);
      intentMap.set("services - yes",triggerConFun );
      intentMap.set("lsnetx.retail - yes",triggerConFun );
      intentMap.set("lsnetx.website - yes",triggerConFun );
      // intentMap.set('', fallBackFu);
      // intentMap.set('your intent name here', googleAssistantHandler);
      agent.handleRequest(intentMap).catch(err=>{
        agent.handleRequest(fallbackFun);
      });
    } catch (error) {
      console.log("ERROR", error);
      
      let req={
   
    "responseId": "336069a5-2b5a-4ab2-b4cf-972781107632-5e314962",
    "queryResult": {
      "queryText": "test",
      "parameters": {},
      "allRequiredParamsPresent": true,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "I didn't understand"
            ]
          }
        },
        {
          "text": {
            "text": [
              "I'm sorry, can you try again?"
            ]
          }
        },
        {
          "text": {
            "text": [
              "This message is from Dialogflow's Cloud Functions for Firebase editor!"
            ]
          }
        },
        {
          "card": {
            "title": "Title: this is a card title",
            "subtitle": "This is the body text of a card.  You can even use line\n  breaks and emoji! 💁",
            "imageUri": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
            "buttons": [
              {
                "text": "This is a button",
                "postback": "https://assistant.google.com/"
              }
            ]
          }
        },
        {
          "quickReplies": {
            "quickReplies": [
              "Quick Reply",
              "Suggestion"
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/lsnetx-chatbot-pspxhh/agent/sessions/55d64aed-c682-088a-f676-a7004cfc3e48/contexts/weather",
          "lifespanCount": 2,
          "parameters": {
            "city": "Rome"
          }
        }
      ],
      "intent": {
        "name": "projects/lsnetx-chatbot-pspxhh/agent/intents/994db840-d37c-416c-b8b7-1963b859a296",
        "displayName": "test"
      },
      "intentDetectionConfidence": 1,
      "diagnosticInfo": {
        "webhook_latency_ms": 52
      },
      "languageCode": "en"
    },
    "webhookStatus": {
      "message": "Webhook execution successful"
    },
    "session": "projects/lsnetx-chatbot-pspxhh/agent/sessions/55d64aed-c682-088a-f676-a7004cfc3e48"
   };
   try {
    request.body=req;
    let x= request;
    const agent1 = new WebhookClient({
      request : x,
      response : response
    });
        let intentMap = new Map();
        intentMap.set('test', testAgent);
        intentMap.set('lsnetx.contact-us', contactUs);
        // intentMap.set('your intent name here', googleAssistantHandler);
        agent1.handleRequest(intentMap);
      } catch (error) {
        response.send(buildChatResponse(`I'm sorry, I don't know this ${error}`));
      }

    }
  }

  function get(request, response) {

    response.send(buildChatResponse(`I'm sorry, Method Not Implemented`));
  }
  return {
    post,
    get
  };
}


 function buildChatResponse(chat) {
  return JSON.stringify({
    speech: chat,
    displayText: chat
  });
}



module.exports = dialogController;