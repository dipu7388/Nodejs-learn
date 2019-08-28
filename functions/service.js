const {
  Card,
  Suggestion,
  Image
} = require('dialogflow-fulfillment');
const extractRequest=require("./convertFullfillmentRequest")
module.exports = function (agent) {
agent= extractRequest(agent);
  agent.add(new Suggestion(`okay`));
  agent.add(new Suggestion(`Yes`));
  agent.add(new Suggestion(`why not`));
};