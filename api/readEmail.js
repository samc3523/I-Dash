const fs = require('fs').promises;
const path = require('path');

async function readMail() {
  const jsonFilePath = path.join(__dirname, 'emails.json');

  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const emailsArray = JSON.parse(data);
    //console.log(emailsArray)
    return emailsArray;
  } catch (err) {
    console.error('Error reading or parsing JSON file:', err);
    return [];
  }
}

//readEmailsFromJSONFile()
module.exports = { readMail };



