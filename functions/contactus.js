// const buildChatResponse=require("../controllers/dialogController");
const {dialogController } = require('../controllers/dialogController');
const request = require('request');
const rp = require('request-promise-native');
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
      body: enquiryModel,
      json: true
    };
   return rp(options);
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
      return Promise.resolve(agent);
}

module.exports = contactUs;