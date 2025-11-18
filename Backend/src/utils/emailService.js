const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Send OTP email
  async sendOTPEmail(email, otpCode, userName) {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'Medical App <noreply@medicalapp.com>',
      to: email,
      subject: 'Email Verification OTP - Medical App',
      html: this.generateOTPEmailTemplate(otpCode, userName)
    };

    try {
      // In development, log OTP to console instead of sending email
      if (process.env.NODE_ENV === 'development' || !process.env.SMTP_USER) {
        console.log('📧 OTP EMAIL (Development Mode)');
        console.log('================================');
        console.log('To: ' + email);
        console.log('Subject: Email Verification OTP - Medical App');
        console.log('OTP Code: ' + otpCode);
        console.log('User: ' + userName);
        console.log('================================');
        return { success: true, message: 'OTP logged to console' };
      }

      // In production, send actual email
      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Email sending error:', error);
      // Fallback to console log if email fails
      console.log('📧 OTP for ' + email + ': ' + otpCode);
      return { success: false, message: 'Failed to send OTP email, check console for OTP' };
    }
  }

  // Generate beautiful OTP email template
  generateOTPEmailTemplate(otpCode, userName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .otp-code { 
            font-size: 32px; 
            font-weight: bold; 
            text-align: center; 
            color: #007bff;
            margin: 20px 0;
            letter-spacing: 5px;
          }
          .footer { 
            background: #333; 
            color: white; 
            padding: 20px; 
            text-align: center;
            font-size: 12px;
          }
          .warning { 
            background: #fff3cd; 
            border: 1px solid #ffeaa7; 
            padding: 15px; 
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Medical Authentication App</h1>
          </div>
          <div class="content">
            <h2>Email Verification</h2>
            <p>Hello ${userName},</p>
            <p>Thank you for registering with our Medical App. Use the following OTP to verify your email address:</p>
            
            <div class="otp-code">${otpCode}</div>
            
            <div class="warning">
              <strong>Important:</strong> 
              <ul>
                <li>This OTP is valid for 10 minutes only</li>
                <li>Do not share this OTP with anyone</li>
                <li>After 5 failed attempts, you'll be blocked for 15 minutes</li>
              </ul>
            </div>
            
            <p>If you didn't request this verification, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Medical App. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Send welcome email after successful verification
  async sendWelcomeEmail(email, userName) {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'Medical App <noreply@medicalapp.com>',
      to: email,
      subject: 'Welcome to Medical App - Email Verified',
      html: this.generateWelcomeEmailTemplate(userName)
    };

    try {
      if (process.env.NODE_ENV === 'development' || !process.env.SMTP_USER) {
        console.log('📧 WELCOME EMAIL (Development Mode)');
        console.log('================================');
        console.log('To: ' + email);
        console.log('Subject: Welcome to Medical App - Email Verified');
        console.log('User: ' + userName);
        console.log('================================');
        return { success: true };
      }

      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Welcome email error:', error);
      return { success: false };
    }
  }

  generateWelcomeEmailTemplate(userName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .footer { 
            background: #333; 
            color: white; 
            padding: 20px; 
            text-align: center;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to Medical App!</h1>
          </div>
          <div class="content">
            <h2>Email Verified Successfully</h2>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Your email has been successfully verified and your account is now active.</p>
            <p>You can now access all features of our Medical App:</p>
            <ul>
              <li>Secure medical record access</li>
              <li>Appointment scheduling</li>
              <li>Doctor consultations</li>
              <li>And much more...</li>
            </ul>
            <p>Thank you for joining our healthcare community!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Medical App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();