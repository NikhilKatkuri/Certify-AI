# Certify-AI 🎓

> AI-powered certificate verification platform built for Hack Your Path 7.0 Hackathon

Detect fraudulent certificates and verify authenticity using AI technology. Upload, analyze, and validate academic certificates instantly.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- pnpm (10.27.0+)
- MongoDB

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment (backend/.env)
MONGODB_URI=your_mongodb_connection_string

# Start backend
cd backend
pnpm dev

# Start frontend (new terminal)
cd client
pnpm dev
```

## 🧪 Testing with Sample Certificates

We've included test certificates in the `sample/` directory:

- **`valid_cer.png`** - Valid certificate (should pass verification)
- **`fraud_cer.png`** - Fraudulent certificate (should be detected)
- **`manual_cer.png`** - Edge case certificate

**To test:**

1. Start the application (see Quick Start above)
2. Navigate to the verification page
3. Upload any certificate from `sample/` folder
4. View AI analysis and verification results

## 🛠️ Tech Stack

- **Backend**: Node.js + Express + TypeScript + MongoDB
- **Frontend**: Next.js + TypeScript
- **AI**: Certificate verification and fraud detection
- **Package Manager**: pnpm workspaces

## 📁 Project Structure

```
├── backend/        # Express API server
├── client/         # Next.js frontend
├── packages/       # Shared types
├── sample/         # Test certificates
└── scripts/        # Utility scripts
```

## 📝 Available Scripts

```bash
pnpm dev          # Development mode
pnpm build        # Production build
pnpm start        # Run production
pnpm lint         # Check code quality
```

## ✨ Features

- Upload and analyze certificates
- AI-powered fraud detection
- Verify student, university, and course details
- Real-time verification scores
- MongoDB data persistence

---

**Built with ❤️ by Stratify Minds**
