import sendEmail from "./sendEmail.js";

const sendVerificationEmail = async ({
  first_name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/pages/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${first_name}</h4>
    ${message}
    `,
  });
};

export default sendVerificationEmail;
