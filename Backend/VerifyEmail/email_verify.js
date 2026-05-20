import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (token, email) => {
  try {
    const verificationLink =
      `https://auth-service-rose.vercel.app/verify/${token}`;

    const response = await resend.emails.send({
      from: "Auth Service <onboarding@resend.dev>",
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
    });

    console.log("Email Sent:", response);

  } catch (error) {
    console.log("Email Error:", error);
  }
};