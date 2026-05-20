import nodemailer from "nodemailer";

export const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  console.log(process.env.USER_EMAIL);
  console.log(process.env.USER_PASS);
  const verificationLink = `https://auth-service-rose.vercel.app/verify/${token}`;
  // const verificationLink = `http://localhost:5173/verify/${token}`;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Verify Your Email",

    html: `
      <div style="font-family: Arial; padding:20px;">
        <h2>Email Verification</h2>

        <p>Click the button below to verify your email.</p>

        <a href="${verificationLink}">
          <button style="
            background:black;
            color:white;
            padding:10px 20px;
            border:none;
            border-radius:5px;
            cursor:pointer;
          ">
            Verify Email
          </button>
        </a>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
