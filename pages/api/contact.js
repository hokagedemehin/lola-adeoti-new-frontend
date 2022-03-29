// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  require('dotenv').config();
  let nodemailer = require('nodemailer');
  // res.status(200).json({ name: 'John Doe' });
  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.SMTP_USERNAME,
    to: 'demehin.george@gmail.com',
    subject: `New Bag Notification request from ${req.body.name}`,
    text: req.body.email,
    html: <div>{req.body.email}</div>,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log('info', info);
    }
  });
  res.status(200).send({ name: req.body.name, email: req.body.email });
  // console.log('req :>> ', req.body);
  // console.log('res :>> ', res);
}
