const {
  Card,
  Suggestion,
  Image
} = require('dialogflow-fulfillment');
const extractRequest = require("./convertFullfillmentRequest")
module.exports = function (agent) {
  agent = extractRequest(agent);
  agent.add(new Suggestion(`Would like to know about your services?`));
  agent.add(new Suggestion(`What Retail Software you Provide?`));
  agent.add(new Suggestion(`Do you make website for retailers?`));
};