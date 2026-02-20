# Certify-AI

A full-stack application for AI-powered certificate verification and management. Built as part of Hack Your Path 7.0 Hackathon.

## Project Overview

Certify-AI is designed to provide a secure, efficient, and user-friendly platform for certificate verification using AI technology integrated with modern web technologies.

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Package Manager**: pnpm

### Frontend

- Located in `/client` directory

### Database

- Type definitions available in `/packages/db.types.ts`

## Project Structure

```
.
├── backend/              # Express server and API
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── client/               # Frontend application
├── docs/                 # Documentation
├── packages/             # Shared packages
│   └── db.types.ts      # Database type definitions
└── README.MD            # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm 10.27.0+
- MongoDB instance
- Cloudinary account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Certify-AI
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create `.env` files in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Development

**Start backend development server:**

```bash
cd backend
pnpm dev
```

This will run the server in watch mode using `tsx`.

**Build for production:**

```bash
pnpm build
```

**Run in production:**

```bash
pnpm start
```

## Available Scripts

### Backend

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Run production build
- `pnpm prettier` - Format code
- `pnpm prettier:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run full linting (type-check + prettier)

## Recent Updates (v1.1.0)

### Backend Improvements

- **Fixed JSON Response Parsing**: Enhanced `format.ts` to properly parse and structure AI responses with all certificate fields
- **Consistent API Responses**: Updated all verification endpoints (`findUniversity`, `findStudent`, `findCourse`) to return consistent response structures with `exists` field
- **Proper HTTP Status Codes**: Added correct status codes (200 for success, 404 for not found) across all endpoints

### Frontend Enhancements

- **Enhanced Context Management**: Extended `SuperContext` to expose `score`, `isProcessing`, `verificationResult`, and `error` states
- **Improved Error Handling**: Functions now gracefully handle errors with proper state management instead of throwing exceptions
- **Better User Feedback**: Added loading state and error messages during certificate verification process
- **Input Validation**: Added validation checks to prevent empty inputs in API calls
- **Response Data Storage**: Properly stores and tracks verification results throughout the process

## API Documentation

For detailed API documentation, see [docs/](docs/) directory.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` to ensure code quality
4. Commit and push your changes
5. Open a pull request

## Features

- AI-powered certificate verification
- Secure certificate management
- Cloud-based file storage with Cloudinary
- Type-safe development with TypeScript
- RESTful API

## License

ISC

## Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ by Stratify Minds**
