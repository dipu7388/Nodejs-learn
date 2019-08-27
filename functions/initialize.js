
const {
    Card,
    Suggestion,
    Image
  } = require('dialogflow-fulfillment');
    module.exports = function (agent) {
      agent.add(new Suggestion(`Would like to know about your services?`));
      agent.add(new Suggestion(`What Retail Software you Provide?`));
      agent.add(new Suggestion(`Do you make website for retailers?`));
      agent.add(new Suggestion(`Other`));
     };