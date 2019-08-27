// const buildChatResponse=require("../controllers/dialogController");
const {dialogController } = require('../controllers/dialogController');
const request = require('request');
function submitEnquery(enquiryModel, agent) {
    console.log(`Company enquery Model: ${JSON.stringify(enquiryModel)}`);
  
    const options = {
      method: 'POST',
      url: 'https://service.lsnetx.com/add/enquiry',
      headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'Accept-Encoding': 'gzip, deflate',
        Host: 'service.lsnetx.com',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: enquiryModel,
      json: true
    };
    request(options, (error, response, body) => {
      if (error) {
        const chat = `Error${error}`;
        agent.add(chat);
        // cloudFnResponse.send(dialogController.buildChatResponse(chat));
      }
  
      console.log(JSON.stringify(response));
      const chat = 'Your request seccessfully sent to our experts';
      agent.add(chat);
      // cloudFnResponse.send(dialogController.buildChatResponse(chat));
    });
  }


 function contactUs(agent){
      const enquiryModel = {};
      enquiryModel.companyId = '3';
      enquiryModel.personName = agent.parameters['given-name'];
      enquiryModel.eamilAddress = agent.parameters.email;
      enquiryModel.contactNumber = agent.parameters['phone-number'];
      enquiryModel.enquiryType = 2;
      submitEnquery(enquiryModel, agent);
      agent.add(JSON.stringify(enquiryModel))
      return agent
}

module.exports = contactUs;