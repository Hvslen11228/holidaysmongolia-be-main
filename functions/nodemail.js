const nodemailer = require("nodemailer");
const MailHtml = require("../templates/mail");
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.Mail_host,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.Mail_user,
    pass: process.env.Mail_pass,
  },
});
module.exports = async function (
  type,
  from_name,
  to_name,
  Address,
  subject,
  data
) {
  let html = "test";
  if ("forgot" == type) {
    html = await MailHtml.forgot(data);
  }
  if ("validation" == type) {
    html = await MailHtml.validation_mail(data);
  }
  if ("ebarimt" == type) {
    // html = await MailHtml.validation_mail(data);
  }
  if (Array.isArray(Address)) {
    Address = await Address.join();

    await transporter.sendMail({
      from: `${from_name} <${process.env.Mail_from}>`,
      to: Address,
      subject: subject,
      html: html,
    });
  } else {
    await transporter.sendMail({
      from: `${from_name} <${process.env.Mail_from}>`,
      to: `${to_name} <${Address}>`,
      subject: subject,
      html: html,
    });
  }
};
