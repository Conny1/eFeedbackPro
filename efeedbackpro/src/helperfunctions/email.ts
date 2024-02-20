import nodemailer from "nodemailer";

// email configurations
const transporter = nodemailer.createTransport({
  host: "mail.efeedbackpro.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "admin@efeedbackpro.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});
// change password email

async function sendMail(email: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"admin@efeedbackpro.com" <admin@efeedbackpro.com>', // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: "Password reset", // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>eFeedbackPro</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
                padding: 20px;
                text-align: center;
            }
    
            .email-container {
                max-width: 400px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
                margin-bottom: 15px;
            }
    
            .highlight {
                color: #4285f4;
                font-weight: bold;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4285f4;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
    
            .button:hover {
                background-color: #3367d6;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h2>eFeedbackPro </h2>
            <p>We received a request to reset your password for your account associated with the email address:</p>
            <p><span class="highlight">${email}</span></p>
            <p>If you did not make this request, you can ignore this email.</p>
            <p>To reset your password, please click the button below:</p>
            <a class="button" href=${`${process.env.RESET_URL}/auth/reset?email=${email}`}>Reset Password</a>
        </div>
    </body>
    </html>
    `,
  });

  console.log("Message sent: %s", info.messageId);
}

// reply to feedback via email funcyion
type dataType = {
  email: string;
  sender: string;
  message: string;
};

async function replyToFeedback(data: dataType) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"admin@efeedbackpro.com" <admin@efeedbackpro.com>', // sender address
    to: data.email, // list of receivers
    subject: `Reply for your feedback from ${data.sender}`, // Subject line
    text: `Reply for your feedback from ${data.sender}`, // plain text body
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.sender} - Reply to Feedback</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f7f7f7;
                  padding: 20px;
                  text-align: center;
              }
      
              .email-container {
                  max-width: 400px;
                  margin: 0 auto;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  padding: 20px;
              }
      
              h2 {
                  color: #333;
              }
      
              p {
                  color: #666;
                  margin-bottom: 15px;
              }
      
              .highlight {
                  color: #4285f4;
                  font-weight: bold;
              }
      
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4285f4;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
              }
      
              .button:hover {
                  background-color: #3367d6;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <h2>${data.sender}</h2>
              <p>Dear ${data.email},</p>
              
              <p><i>${data.message}</i></p>
              <p>We appreciate your participation.</p>
              <p>Best regards,</p>
              <p>The ${data.sender} Team</p>
          </div>
      </body>
      </html>
      
      `,
  });

  console.log("Message sent: %s", info.messageId);
}

export { sendMail, replyToFeedback };
