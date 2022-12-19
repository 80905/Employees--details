const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user) {
    console.log({ user });
    this.to = user.email;
    this.firstName = user.firstName;
    this.from = `Akhilesh Kumar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      "Welcome to the family!!",
      `Hey!! ${this.firstName} your most welcome!!`
    );
  }
};
