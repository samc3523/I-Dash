const imaps = require('imap-simple');
const { convert } = require('html-to-text');
const { READ_MAIL_CONFIG } = require('./config');


const readMail = async () => {
  let msgs = [] 
    try {
      const connection = await imaps.connect(READ_MAIL_CONFIG);
      console.log('CONNECTION SUCCESSFUL', new Date().toString());
      const box = await connection.openBox('INBOX');
      const searchCriteria = ['ALL'];
      const fetchOptions = {
        bodies: ['HEADER','TEXT'],
        markSeen: false,
      };
      const results = await connection.search(searchCriteria, fetchOptions);
      i = 0
      results.forEach((res) => {
        const head = res.parts.filter((part) => {
          return part.which === 'HEADER';
        });
        const text = res.parts.filter((part) => {
          return part.which === 'TEXT';
        });
        let from = head[0].body.from
        let emailHTML = text[0].body;
        let emailText = convert(emailHTML);
        let findStr = "text_0.txt "
        let Start = emailText.indexOf(findStr) + findStr.length;        
        let output = emailText.substring(Start);
        output = output.split('--')[0]
        output = output.replace(/ +(?= )/g,'');
        output = output.replace(/\n/g, " ");
        msgs.push({'from':from[0],"msg":output,"id":i++});
      });
      connection.end();
      return msgs;
    } catch (error) {
      console.log(error);
    }
  };

  
  module.exports = {
    readMail,
  };

