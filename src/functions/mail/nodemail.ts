import nodemailer from "nodemailer";
import MailHtml from "../../templates/mails";
export default async (
  type: string,
  from_name: string,
  to_name: string,
  Address: any,
  subject: any,
  data: any
) => {
  const transporter = await nodemailer.createTransport(
    `smtps://${process.env.Mail_user}:${process.env.Mail_pass}@${process.env.Mail_host}`
  );
  let html = "test";
  if ("forgot" == type) {
    html = await MailHtml.forgot(data);
  }
  if ("validation" == type) {
    html = await MailHtml.validation_mail(data);
  }
  if ("notf" == type) {
    html = await MailHtml.notf(data);
  }
  if ("ebarimt" == type) {
    // html = await MailHtml.validation_mail(data);
  }
  // transporter.verify((err, success) => {
  //   if (err) console.error(err);
  //   console.log("Your config is correct");
  // });
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
      from: `${process.env.Mail_from}`,
      to: `${Address}`,
      subject: subject,
      html: html,
    });
  }
};
