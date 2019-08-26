
const {
    Card,
    Suggestion,
    Image
  } = require('dialogflow-fulfillment');
    module.exports = function (agent) {
      agent.add(new Suggestion(`Suggestion 1`));
      agent.add(new Suggestion(`Suggestion 2`));
      agent.add(new Suggestion(`Suggestion 3`));
      agent.add(new Suggestion(`Suggestion 4`));
     };