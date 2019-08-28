const extractRequest=require("./convertFullfillmentRequest")
module.exports=  function fallback(agent) {
    agent= extractRequest(agent);
    agent.add(`Webhook called but no handeler assigned for ${agent.intent}`);
  }