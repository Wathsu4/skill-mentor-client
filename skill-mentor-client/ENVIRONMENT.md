# Environment Configuration Guide

This document explains how to set up environment variables for the Skill Mentor Client application.

## Environment Files

The application supports multiple environment files:

- `.env.example` - Template with all available environment variables
- `.env.local` - Local development environment (ignored by git)
- `.env.development` - Development environment settings
- `.env.production` - Production environment settings

## Setup Instructions

1. **For Local Development:**
   ```bash
   cp .env.example .env.local
   ```
2. **Edit `.env.local`** with your actual values:
   - Update API URLs to match your backend
   - Add your authentication keys
   - Configure feature flags as needed

## Available Environment Variables

### API Configuration

- `VITE_API_BASE_URL` - Base URL for your backend API
- `VITE_BACKEND_URL` - Alternative backend URL (legacy)
- `VITE_API_TIMEOUT` - API request timeout in milliseconds

### Authentication

- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk authentication public key
- `VITE_JWT_SECRET` - JWT secret for token validation (if applicable)

### Feature Flags

- `VITE_ENABLE_ANALYTICS` - Enable/disable analytics tracking
- `VITE_ENABLE_CHAT` - Enable/disable chat functionality
- `VITE_ENABLE_VIDEO_CALLS` - Enable/disable video call features
- `VITE_USE_MOCK_DATA` - Use mock data when backend is unavailable

### Development Settings

- `VITE_DEBUG_MODE` - Enable debug logging
- `VITE_LOG_LEVEL` - Set logging level (debug, info, warn, error)
- `NODE_ENV` - Node environment (development, production)

### File Upload

- `VITE_MAX_FILE_SIZE` - Maximum file upload size in bytes
- `VITE_ALLOWED_FILE_TYPES` - Comma-separated list of allowed MIME types

### Session

- `VITE_SESSION_TIMEOUT` - Session timeout in milliseconds

## Important Notes

- All environment files except `.env.example` are ignored by git for security
- Variables must be prefixed with `VITE_` to be accessible in the client-side code
- Restart the development server after changing environment variables
- Never commit sensitive keys or secrets to version control

## Troubleshooting

If environment variables are not working:

1. Check that the variable name is prefixed with `VITE_`
2. Restart the development server
3. Verify the file is in the project root directory
4. Check for syntax errors in the environment file

## Security Best Practices

- Use different keys for development and production
- Regularly rotate sensitive keys
- Use environment-specific values
- Never expose sensitive data in client-side code
