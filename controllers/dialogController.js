/* eslint-disable quote-props */
/* eslint-disable no-console */
const request = require('request');

function dialogController(Dialog) {
  function post(req, res) {
    const dialog = new Dialog(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    dialog.save();
    res.status(201);
    return res.json(dialog);
  }
  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    const options = {
      method: 'POST',
      url: 'https://service.lsnetx.com/add/enquiry',
      headers:
      {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'Accept-Encoding': 'gzip, deflate',
        Host: 'service.lsnetx.com',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body:
      {
        companyId: '3',
        contactNumber: 9898989898,
        emailAddress: 'aaaa7388@gmail.com',
        enquiryType: 3,
        feedback: 'hiii this',
        personName: 'TEst'
      },
      json: true
    };
    // eslint-disable-next-line consistent-return
    request(options, (error, response, body) => {
      if (error) {
        return res.send(error);
      }
      console.log(JSON.stringify(response));
      res.send(JSON.stringify(body));
    });
    // Dialog.find(query, (err, dialogs) => {
    //   if (err) {
    //     return res.send(err);
    //   }
    //   return res.json(dialogs);
    // });
  }
  return { post, get };
}

module.exports = dialogController;
