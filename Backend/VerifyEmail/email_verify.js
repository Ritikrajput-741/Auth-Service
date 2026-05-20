import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (token, email) => {
  try {
    const verificationLink = `https://auth-service-rose.vercel.app/verify/${token}`;

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
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
    });

    console.log(response);
  } catch (error) {
    console.log("Email Error:", error);
  }
};
