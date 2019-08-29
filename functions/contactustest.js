const request = require('request');
const rp = require('request-promise-native');
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


 function contactUs(agent){
      const enquiryModel = {};
      enquiryModel.companyId = '3';
      enquiryModel.personName = "Dheerendra Kumar Singh";
      enquiryModel.emailAddress = "web.lsnetx@gmail.com";
      enquiryModel.contactNumber = "9026636795";
      enquiryModel.enquiryType = 2;
      enquiryModel.feedback="Live Feed From Chatbot";
      debugger;
      let datax;
      submitEnquery(enquiryModel, agent).then(data=>{
      debugger;
      datax=data;
        console.log("Resolve Contact US",data );
        if(data){
         console.log("Success ", data);
         
        }
      }).catch(data=>{
        console.log("Reject Contact US",data );
      });
      return Promise.resolve(Object.assign(enquiryModel,datax));
}
module.exports=contactUs;