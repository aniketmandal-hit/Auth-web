import nodemailer from "nodemailer";

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP_USER and SMTP_PASS environment variables must be defined");
}

const transporter = nodemailer.createTransport({
    host : "smtp-relay.brevo.com",
    port : 587,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    },
});

export default transporter;