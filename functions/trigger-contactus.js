const {
    Card,
    Suggestion,
    Image
  } = require('dialogflow-fulfillment');
    module.exports = function (agent) {
    agent.add("dummyData");
      agent.setFollowupEvent("contactus");
     };