
const {
    Card,
    Suggestion,
    Image
  } = require('dialogflow-fulfillment');
  const initFun= require("./initialize")
    module.exports = function (agent) {
      agent.add("Hi there");
      agent.add("Welcome to LsnetX");
      agent.add("How Can i help you");
      initFun(agent);
     };