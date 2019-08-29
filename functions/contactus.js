// const buildChatResponse=require("../controllers/dialogController");
const {
  dialogController
} = require('../controllers/dialogController');
const request = require('request');
const rp = require('request-promise-native');
const extractRequest = require("./convertFullfillmentRequest")

function submitEnquery(enquiryModel, cloudFnResponse) {
  return new Promise((resolve,reject)=>{
      console.log(`Company enquery Model: ${JSON.stringify(enquiryModel)}`);
        const options = {
          method: 'POST',
          url: 'https://service.lsnetx.com/add/enquiry',
          headers: {
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'Content-Type': 'application/json'
          },
          body: enquiryModel,
          json: true
        };
        debugger;
        request(options,(err,res,body)=>{
            console.log("res.statusCode" , res.statusCode);
            console.log("err" , err);
            console.log("body", body);
            if(err){
                reject(err);
            }
            if(body['errorFlag']== false){
                  resolve(body)
            }else{
                reject(body)
            }
        });
  })
}


function contactUs(agent) {
  agent = extractRequest(agent);
  const enquiryModel = {};
  enquiryModel.companyId = '3';
  enquiryModel.personName = agent.parameters['given-name'];
  enquiryModel.emailAddress = agent.parameters.email;
  enquiryModel.contactNumber = agent.parameters['phone-number'];
  enquiryModel.enquiryType = 2;
  enquiryModel.feedback="";
  let datax;
  submitEnquery(enquiryModel, agent).then(data => {
    console.log("Resolve Contact US", data);
    if (data) {
    }
  }).catch(data => {
    console.log("Reject Contact US", data);
    if (data) {
      agent.add("Something Bad Happens");
      agent.add("Plese reach us at support@lsnetx.com");
    }
  });
  return Promise.resolve(agent);
}

module.exports = contactUs;