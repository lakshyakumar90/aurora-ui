import nodemailer from "nodemailer";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
  console.warn(
    "Gmail OAuth2 credentials are not set. Email sending will fail. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in your environment variables.",
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER || "me@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export async function sendVerificationEmail({
  email,
  verificationUrl,
  name,
}: {
  email: string;
  verificationUrl: string;
  name?: string | null;
}) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error(
      "Gmail OAuth2 is not configured. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in your environment variables.",
    );
  }

  try {
    const fromEmail = process.env.GMAIL_USER || process.env.GMAIL_FROM_EMAIL || "me@gmail.com";
    
    const info = await transporter.sendMail({
      from: `"Aurora UI" <${fromEmail}>`,
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your email</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
            </div>
            <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                ${name ? `Hi ${name},` : "Hi there,"}
              </p>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Thanks for signing up! Please verify your email address by clicking the button below:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Verify Email Address
                </a>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                If the button doesn't work, you can copy and paste this link into your browser:
              </p>
              <p style="font-size: 12px; color: #999; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">
                ${verificationUrl}
              </p>
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                This link will expire in 24 hours.
              </p>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
            <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
              <p>© ${new Date().getFullYear()} Aurora UI. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${name || "there"},

Thanks for signing up! Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.

© ${new Date().getFullYear()} Aurora UI. All rights reserved.
      `.trim(),
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

