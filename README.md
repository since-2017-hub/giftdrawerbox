# GiftDrawerBox

A Next.js + Prisma + PostgreSQL project with full-featured user authentication.

## Features
- User registration, login, and password reset
- JWT authentication with refresh tokens
- Google login/signup (OAuth)
- "Remember me" login option
- Secure password hashing
- Prisma ORM with PostgreSQL
- API routes for authentication
- Middleware for protected routes

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file in the root directory:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. Set up the database
Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

### 4. Start the development server
```bash
npm run dev
```

## Project Structure
- `app/` - Next.js app directory
- `prisma/` - Prisma schema
- `libs/prisma.ts` - Prisma client setup
- `app/api/auth/` - Authentication API routes
- `app/components/` - UI components

## Authentication API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/google` - Google OAuth login/signup

## License
MIT
# giftdrawerbox
next.js prisma google authenticator
