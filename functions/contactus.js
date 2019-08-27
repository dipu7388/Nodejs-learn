// const buildChatResponse=require("../controllers/dialogController");
const {dialogController } = require('../controllers/dialogController');
function submitEnquery(enquiryModel, cloudFnResponse) {
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
      body: {
        companyId: '3',
        contactNumber: 9898989898,
        emailAddress: 'aaaa7388@gmail.com',
        enquiryType: 3,
        feedback: 'hiii this',
        personName: 'TEst'
      },
      json: true
    };
    request(options, (error, response, body) => {
      if (error) {
        const chat = `Error${error}`;
        cloudFnResponse.send(dialogController.buildChatResponse(chat));
      }
  
      console.log(JSON.stringify(response));
      const chat = 'Your request seccessfully sent to our experts';
      cloudFnResponse.send(dialogController.buildChatResponse(chat));
    });
  }


 function contactUs(agent){
      const enquiryModel = {};
      enquiryModel.companyId = '3';
      enquiryModel.personName = agent.parameters['given-name'];
      enquiryModel.eamilAddress = agent.parameters.email;
      enquiryModel.contactNumber = agent.parameters['phone-number'];
      enquiryModel.enquiryType = 2;
      submitEnquery(enquiryModel, agent.response);
      agent.response.send(enquiryModel)
      agent.response.status(201);
      return response.json(dialog);
}

module.exports = contactUs;