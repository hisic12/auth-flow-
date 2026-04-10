const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("Email config error", err);
  else console.log("Email server is ready!");
});

const sendResetPassword = async (email, token) => {
  const mailOptions = {
    from: `"Auth Flow" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Password",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  
  <div style="max-width: 500px; margin: 40px auto; background: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
    
    <h2 style="color: #333;">Reset Your Password</h2>
    
    <p style="color: #555; font-size: 14px;">
      Hello, <strong>{{email}}</strong>
    </p>

    <p style="color: #555; font-size: 14px;">
      Use the token below to reset your password:
    </p>

    <div style="margin: 20px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; font-weight: bold; color: #333; width: 100%;">
     <a href="http://127.0.0.1:5500/frontend/reset-password.html?token={{token}}">Click to reset password</a>
    </div>

    <p style="color: #888; font-size: 12px;">
      If you didn’t request this, please ignore this email.
    </p>

  </div>

</body>
</html>`
      .replace("{{email}}", email)
      .replace("{{token}}", token),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendResetPassword;
