// const buildChatResponse=require("../controllers/dialogController");
const {dialogController } = require('../controllers/dialogController');
const request = require('request');
function submitEnquery(enquiryModel, cloudFnResponse) {
  return new Promise((resolve, reject)=>{
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
      response.statusMessage=chat;
      response.statusCode=200;
      if (error) {
        const chat = `Error${error}`;
      
        reject(chat);
        // cloudFnResponse.send(dialogController.buildChatResponse(chat));
      }
  
      console.log(JSON.stringify(response));
      const chat = 'Your request seccessfully sent to our experts';
      resolve(chat);
      // cloudFnResponse.send(dialogController.buildChatResponse(chat));
    });
  })
  }


 function contactUs(agent){
      const enquiryModel = {};
      enquiryModel.companyId = '3';
      enquiryModel.personName = agent.parameters['given-name'];
      enquiryModel.eamilAddress = agent.parameters.email;
      enquiryModel.contactNumber = agent.parameters['phone-number'];
      enquiryModel.enquiryType = 2;
      agent.add("sdh")
      submitEnquery(enquiryModel, agent).then(data=>{
        console.log("Resolve Contact US",data );
        if(data){
          agent.add(data);
          
        }
      }).catch(data=>{
        console.log("Reject Contact US",data );
        if(data){
          agent.add(data);
        }
      });
}

module.exports = contactUs;