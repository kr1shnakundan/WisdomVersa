const resetPasswordEmail = (name, resetUrl) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #0f172a;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #020617;
        border-radius: 8px;
        padding: 32px;
        color: #e5e7eb;
      }
      .logo {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #facc15;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 22px;
        margin-bottom: 12px;
        color: #f8fafc;
      }
      p {
        font-size: 15px;
        line-height: 1.6;
        color: #cbd5f5;
      }
      .button-wrapper {
        text-align: center;
        margin: 32px 0;
      }
      .reset-button {
        background-color: #facc15;
        color: #020617;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
      }
      .reset-button:hover {
        background-color: #eab308;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #94a3b8;
        text-align: center;
      }
      .warning {
        margin-top: 20px;
        font-size: 13px;
        color: #f87171;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">WisdomVersa</div>

      <h1>Reset Your Password</h1>

      <p>Hi ${name || "there"},</p>

      <p>
        We received a request to reset your password. Click the button below
        to set a new password. This link is valid for <strong>5 minutes</strong>.
      </p>

      <div class="button-wrapper">
        <a href="${resetUrl}" class="reset-button">
          Reset Password
        </a>
      </div>

      <p>
        If the button doesn’t work, copy and paste this link into your browser:
      </p>

      <p style="word-break: break-all; color:#38bdf8;">
        ${resetUrl}
      </p>

      <p class="warning">
        If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <div class="footer">
        © ${new Date().getFullYear()} WisdomVersa. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};


module.exports = resetPasswordEmail;