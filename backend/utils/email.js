const nodemailer = require("nodemailer");
const config = require("config");
const path = require("path");
const pug = require("pug");
const { convert } = require("html-to-text");

const smtp = config.get("smtp");

class Email {
  constructor(user, password) {
    this.user = user;
    this.password = password;
    this.firstName = user.fullName.split(" ")[0];
    this.to = user.email;
    this.from = `MsiForum ${config.get("emailFrom")}`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  async send(template, subject) {
    // console.log("inside");

    const loc = path.join(__dirname, "../views", `${template}.pug`);
    const html = pug.renderFile(loc, {
      firstName: this.firstName,
      subject,
      password: this.password,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(html),
      html,
    };
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendPassword() {
    await this.send("password", "Your account password");
  }
}

module.exports = Email;
