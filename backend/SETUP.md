# Backend Setup Instructions

## Overview
Your portfolio backend is now fully integrated with the frontend contact form. It handles:
- Contact form submissions from the frontend
- Email notifications to your inbox
- Confirmation emails to users
- Comprehensive error handling
- CORS support for frontend requests

## Prerequisites
- Node.js installed (v14 or higher)
- npm installed
- Gmail account for email service

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Gmail for email sending:**
   - Go to your Google Account: https://myaccount.google.com
   - Enable 2-Factor Authentication (if not already enabled)
   - Generate App Password:
     - Go to Security settings
     - Select "App passwords"
     - Choose Mail and Windows Computer
     - Copy the generated 16-character password

3. **Update .env file:**
   ```env
   PORT=5000
   NODE_ENV=development
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_16_char_app_password
   EMAIL_TO=your_email@gmail.com
   PORTFOLIO_NAME=Vaibhav Portfolio
   ```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **URL:** `/api/health`
- **Method:** GET
- **Response:** `{ status: 'Backend is running successfully' }`

### Contact Form Submission
- **URL:** `/api/contact`
- **Method:** POST
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "subject": "Website Inquiry",
    "message": "Your message here"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Message sent successfully! We will contact you soon."
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "Error description"
  }
  ```

## Features

✅ **Contact Form Handling** - Receives and validates all form data
✅ **Email Notifications** - Sends emails to your configured inbox
✅ **User Confirmation** - Sends automatic reply to the user
✅ **Input Validation** - Validates all required fields and email format
✅ **Error Handling** - Comprehensive error management with user-friendly messages
✅ **CORS Enabled** - Supports cross-origin requests from frontend
✅ **Production Ready** - Includes error handlers and middleware

## Troubleshooting

### Issue: "Failed to send message"
- Check if Gmail 2FA is enabled
- Verify App Password is correct (16 characters)
- Ensure EMAIL_TO is set correctly in .env

### Issue: CORS Errors
- Backend already has CORS enabled
- Make sure frontend is sending correct Content-Type header

### Issue: "All fields are required"
- Ensure all form fields are filled
- Frontend has `required` attribute on all inputs

## Testing the Contact Form

1. Start the backend:
   ```bash
   npm run dev
   ```

2. Open your portfolio in a browser

3. Fill out the contact form and submit

4. You should receive:
   - Email in your EMAIL_TO inbox
   - Confirmation email to the user's email address

## Security Notes

- Keep `.env` file private (it's in .gitignore)
- Never commit EMAIL_PASS to git
- Use App Passwords instead of main Gmail password
- Validate all inputs (already implemented)
- Add rate limiting in production (optional enhancement)

## Deployment

For production deployment:
1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use a service like Heroku, Vercel, or Railway
4. Update frontend API URL if domain changes
5. Consider using SendGrid or similar service instead of Gmail for reliability

## Support

For issues or questions, check:
- Console logs for detailed error messages
- .env file configuration
- Gmail App Password generation
- Frontend console (browser DevTools)
