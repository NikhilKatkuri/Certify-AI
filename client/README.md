# Certify-AI Client

A modern Next.js frontend for the Certify-AI certificate verification platform. Upload, analyze, and verify academic certificates with AI-powered fraud detection.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
npm start
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📋 Features

- 📱 **Responsive UI** - Works seamlessly on desktop, tablet, and mobile
- 📤 **Certificate Upload** - Easy drag-and-drop or file selection
- 🔍 **Real-time Analysis** - Instant AI-powered certificate verification
- 📊 **Detailed Results** - View verification scores and fraud detection results
- 🎨 **Modern Design** - Clean, intuitive interface with Tailwind CSS
- ⚡ **Fast Performance** - Server-side rendering with Next.js for optimal speed

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Package Manager**: pnpm

## 📁 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home/landing page
│   │   ├── globals.css         # Global styles
│   │   └── verify/
│   │       └── page.tsx        # Certificate verification page
│   ├── components/
│   │   ├── ProgressLoader.tsx  # Loading spinner component
│   │   └── ...
│   ├── provider/
│   │   └── Super.tsx           # Context provider for app state
│   ├── types/
│   │   └── db.types.ts         # TypeScript type definitions
│   └── ...
├── public/                      # Static assets
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## 🔗 API Integration

The client communicates with the backend API running on `http://localhost:4000`.

### Main Endpoints Used:

- `POST /api/challenge/format` - Upload certificate and get AI analysis
- `GET /api/data_set/universities` - Fetch university data
- `GET /api/data_set/students` - Fetch student data
- `GET /api/data_set/courses` - Fetch course data

### Expected Response Format:

```json
{
  "document_type": "Certificate of Completion",
  "issuing_organization": "University Name",
  "student_name": "Student Name",
  "roll_number": "12345",
  "course_name": "Computer Science",
  "issue_date": "2024-01-15",
  "score": 0.95,
  "exists": true
}
```

## 🎯 Context API (State Management)

The app uses React Context (`SuperContext`) to manage global state:

```typescript
{
  score: number; // Verification score (0-1)
  isProcessing: boolean; // Loading state
  verificationResult: object; // API response data
  error: string | null; // Error message
}
```

Access it using the `useContext` hook in any component.

## 📦 Available Scripts

```bash
# Development
npm start              # Start dev server with hot reload
pnpm dev              # Alternative: pnpm dev

# Production
npm run build         # Build for production
pnpm start            # Start production server

# Code Quality
npm run lint          # Run ESLint
npm run type-check    # Check TypeScript types

# Formatting (from root)
pnpm prettier         # Format code
pnpm prettier:check   # Check code formatting
```

## 🌍 Environment Variables

Create a `.env.local` file in the client directory (optional):

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> **Note**: Environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

## 🎨 Styling

The client uses **Tailwind CSS** for styling. Configuration files:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS with Tailwind processor
- `src/app/globals.css` - Global styles

## 🧪 Testing Certificates

Use the sample certificates from the `sample/` directory to test:

1. Go to the verification page
2. Upload `valid_cer.png` (should pass)
3. Upload `fraud_cer.png` (should be detected as fraud)
4. Upload `manual_cer.png` (edge case)

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Backend Connection Issues

- Ensure backend is running on `http://localhost:4000`
- Check network connectivity
- Verify `NEXT_PUBLIC_API_URL` if using custom environment

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm build
```

## 📚 Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` and `pnpm type-check`
4. Commit with clear messages
5. Push and create a pull request

---

**Part of Certify-AI** - Built for Hack Your Path 7.0 Hackathon by Stratify Minds
