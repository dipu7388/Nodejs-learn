const {
  Card,
  Suggestion,
  Image,
  Text,

} = require('dialogflow-fulfillment');
module.exports = function (agent) {
  agent.consoleMessages.forEach(msg => {
    if (msg instanceof Text && msg['text']) {
      agent.add(msg['text']);
    } else if (msg instanceof Array) {
      msg.forEach(sugg => {
        if (sugg instanceof Suggestion) {
          agent.add(new Suggestion(sugg));
        }
      })
    } else if (msg instanceof Suggestion) {
      agent.add(new Suggestion(msg));
    }
  })
};