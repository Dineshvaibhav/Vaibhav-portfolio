const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../'));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running successfully' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0ef;">New Message from Portfolio</h2>
          <hr style="border: 1px solid #0ef;">
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <h3 style="color: #0ef; margin-top: 20px;">Message:</h3>
          <p style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #0ef;">
            ${message.replace(/\n/g, '<br>')}
          </p>
          
          <hr style="border: 1px solid #ddd; margin-top: 30px;">
          <p style="font-size: 12px; color: #999;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to user
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Message Received - ${process.env.PORTFOLIO_NAME || 'Vaibhav Portfolio'}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0ef;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          
          <h3 style="color: #0ef;">Message Summary:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message.replace(/\n/g, '<br>')}</p>
          
          <hr style="border: 1px solid #ddd; margin-top: 30px;">
          <p style="font-size: 12px; color: #999;">
            Thank you for your interest. We look forward to connecting with you!
          </p>
        </div>
      `
    };

    await transporter.sendMail(confirmationEmail);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.'
    });

  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER}`);
});

module.exports = app;
