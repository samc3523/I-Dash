module.exports.READ_MAIL_CONFIG = {
    imap: {
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: 'imap.gmail.com',
      port: 993,
      authTimeout: 10000,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    },
  };