const fs = require('fs');
const path = require('path');
const MailListener = require('mail-listener2');
const { v4: uuidv4 } = require('uuid');

// Local counter for unique IDs
let idCounter = 1;

// Function to generate a unique ID
function generateUniqueId() {
  return idCounter++;
}

// Function to start the mail listener
function startMailListener() {
  // JSON file path to store email data
  const jsonFilePath = path.join(__dirname, 'emails.json');

  // Function to load existing email data from the JSON file
  function loadEmailsFromJSONFile() {
    try {
      const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  // Array to store email data (initialize with existing data)
  let emails = loadEmailsFromJSONFile();

  const mailListener = new MailListener({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: 'imap.gmail.com',
    port: 993, // IMAP port (usually 993 for SSL)
    tls: true,
    tlsOptions: { rejectUnauthorized: false }, // Adjust based on your email provider
    mailbox: 'INBOX', // Mailbox to watch
    searchFilter: ['UNSEEN'], // Filter for unseen emails
    markSeen: true, // Mark emails as read
    fetchUnreadOnStart: true, // Fetch unread emails on start
  });

  // Start the mail listener
  mailListener.start();

  // Event listener when a new email arrives
  mailListener.on('mail', mail => {
    console.log('New email received:');
    const uniqueId = generateUniqueId(); // Generate a unique ID for the email

    let content = ''; // Variable to store attachment content

    // Process text attachments
    if (mail.attachments && mail.attachments.length > 0) {
      mail.attachments.forEach(attachment => {
        if (attachment.contentType === 'text/plain') {
          content = attachment.content.toString(); // Read attachment content
        }
      });
    }

    // Prepare email data
    const emailData = {
      uid: uniqueId,
      from: mail.from[0].address,
      content: content,
    };

    // Add email data to the emails array
    emails.push(emailData);

    // Update JSON file with new email data
    appendEmailsToJSONFile();
  });

  // Error handling for mail listener
  mailListener.on('error', err => {
    console.log('Mail listener error:', err);
    console.log('Restarting mail listener...');
    // Restart mail listener on error
    mailListener.stop();
    startMailListener();
  });

  // Function to append email data to the JSON file
  function appendEmailsToJSONFile() {
    // Write updated email data to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(emails, null, 2));
  }

  // Close the mail listener when done
  // mailListener.stop();
}

// Start the mail listener
startMailListener();
