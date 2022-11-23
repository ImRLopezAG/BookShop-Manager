const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 587,
  auth: {
    user: 'BookShopManagerItla@gmail.com',
    pass: 'rjcozffkawrgmpel',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
