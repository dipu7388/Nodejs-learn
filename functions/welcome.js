
const {
    Card,
    Suggestion,
    Image
  } = require('dialogflow-fulfillment');
  const initFun= require("./initialize");
    module.exports = function (agent) {
      agent.add("Hi! Welcome to LsnetX");
      agent.add("What would you like to know?");
      initFun(agent);
     };