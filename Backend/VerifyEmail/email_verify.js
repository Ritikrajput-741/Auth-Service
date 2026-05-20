import nodemailer from "nodemailer";

export const verifyEmail = async (token, email) => {
  if (!process.env.USER_EMAIL || !process.env.USER_PASS) {
    throw new Error("Email credentials are missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const frontendUrl =
    process.env.FRONTEND_URL || "https://auth-service-rose.vercel.app";
  const verificationLink = `${frontendUrl}/verify/${token}`;

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

  const info = await transporter.sendMail(mailOptions);
  console.log("Verification email sent:", info.response);
};
