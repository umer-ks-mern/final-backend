import nodemailer from "nodemailer";
let transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3155907e46a8db",
    pass: "a5b4f869e3345c"
  }
});

export default transport; 