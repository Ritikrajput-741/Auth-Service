import nodemailer from "nodemailer";

export const verifyEmail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });

    const verificationLink = `https://auth-service-rose.vercel.app/verify/${token}`;

    const mailOptions = {
      from: process.env.BREVO_EMAIL,
      to: email,
      subject: "Verify Your Email",

      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>Email Verification</h2>

          <p>Click below to verify your email.</p>

          <a href="${verificationLink}">
            Verify Email
          </a>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.response);
  } catch (error) {
    console.log("Email Error:", error);
  }
};
