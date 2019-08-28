const {
  Card,
  Suggestion,
  Image
} = require('dialogflow-fulfillment');
const initFun = require("./initialize");
const extractRequest = require("./convertFullfillmentRequest")
module.exports = function (agent) {
  agent = extractRequest(agent);
  agent.add("Hi! Welcome to LsnetX");
  agent.add("What would you like to know?");
  initFun(agent);
};