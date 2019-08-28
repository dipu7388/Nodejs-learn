const {
  Card,
  Suggestion,
  Image
} = require('dialogflow-fulfillment');
const extractRequest = require("./convertFullfillmentRequest")
module.exports = function (agent) {
  agent = extractRequest(agent);
  agent.add("dummyData");
  agent.setFollowupEvent("contactus");
};