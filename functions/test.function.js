//  function testAgent(agent) {
//    console.log('I didnt understand');
   
//     agent.add(`I didn't understand`);
//     agent.add(`I'm sorry, can you try again?`);
//   }
const {
  Card,
  Suggestion,
  Image
} = require('dialogflow-fulfillment');
  module.exports = function (agent) {
     agent.add(`I didn't understand`);
     agent.add(`I'm sorry, can you try again?`);
         agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    agent.add(new Card({
        title: `Title: this is a card title`,
        imageUrl: 'http://192.200.1.243:8980/cdn/fetch/15/3/PAGE_LIST/BACKGROUND/17_1/HomePage_Banner01.jpg',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(new Card({
      title: `Title: this is a card title`,
      imageUrl: 'http://192.200.1.243:8980/cdn/fetch/15/3/PAGE_LIST/BACKGROUND/17_1/HomePage_Banner01.jpg',
      text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
      buttonText: 'This is a button',
      buttonUrl: 'https://assistant.google.com/'
    })
  );
    // agent.add(new Image('http://192.200.1.243:8980/cdn/fetch/15/3/PAGE_LIST/BACKGROUND/17_1/HomePage_Banner01.jpg'))
    agent.add(new Suggestion(`Quick Reply`));
    agent.add(new Suggestion(`Suggestion`));
    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    let conv = agent.conv(); // Get Actions on Google library conv instance
    if(conv){
      conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
      agent.add(conv); // Add Actions on Google library responses to your agent's response
    }
   };