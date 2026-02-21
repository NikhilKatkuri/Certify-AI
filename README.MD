# Certify-AI

AI-powered certificate verification platform built for Hack Your Path 7.0 Hackathon. Detect fraudulent certificates and verify authenticity using AI technology. Upload, analyze, and validate academic certificates instantly.

## Platform Overview

The platform consists of three main components:

- **Client**: The frontend user interface for uploading certificates and viewing results.
- **Server (Backend)**: The API server handling requests, data processing, and integration with the database.
- **LLM**: The AI component for certificate analysis and fraud detection, which can be run optionally depending on your needs (e.g., if you want to use a local AI model for verification). If not installed or run, the platform may fall back to basic verification or require external AI services.

## Features

- Upload and analyze certificates
- AI-powered fraud detection
- Verify student, university, and course details
- Real-time verification scores
- MongoDB data persistence

## Quick Start Demo (5 minutes)

Get Certify-AI running in just a few commands:

```bash
# 1. Clone the repository
git clone https://github.com/NikhilKatkuri/certify-ai.git
cd certify-ai

# 2. Install all dependencies (with pnpm workspaces)
pnpm run install:all

# 3. Set up MongoDB
# Skip if using MongoDB Atlas - update backend/.env with your connection string
# Or use local MongoDB: ensure MongoDB is running on localhost:27017

# 4. Set up Ollama and download llama3.2 model (required for AI features)
# Windows/Mac/Linux - Download and install Ollama from: https://ollama.ai
# Then download the llama3.2 model:
# compabiltu with windows  is have atleast mininum 8gb ram  , (i5 and after i5 &ryzen 5, 10th gen or higher) and 4 cores or higher with 4 threads or higher and vram of atleast 4gb or higher

ollama pull llama3.2

# 5. ipconfig preffer ipv4 or default to localhost in backend/.env for AI_SERVER_URL=http://localhost:2007

# 6. Start all services at once
pnpm run dev

# 7 steps to test:
# - Open http://localhost:3000 in your browser
# - click on "Verify Certificate"
# - Upload a certificate from the sample/ folder (e.g., valid_cer.png)
# - View the AI analysis and verification results

```

That's it! Open `http://localhost:3000` and start uploading certificates.

**Optional: If you don't have Ollama/llama3.2 installed:**

- Basic certificate verification will still work
- Advanced AI fraud detection will be limited
- Install Ollama later and restart the LLM server for full features

## Tech Stack

- **Backend**: Node.js + Express + TypeScript + MongoDB
- **Frontend**: Next.js + TypeScript (runs on port 3000 by default)
- **AI/LLM**: Node.js-based AI server for local model inference (runs on port 2007 by default)
- **Package Manager**: pnpm workspaces
- **Other**: Concurrently for running multiple services in development

## Project Structure

```
├── backend/        # Express API server (runs on port 4000)
├── client/         # Next.js frontend (runs on port 3000)
├── llm/            # AI/LLM server for certificate verification and fraud detection
├── packages/       # Shared types
├── sample/         # Test certificates
└── scripts/        # Utility scripts
```

## Prerequisites

- Node.js (v18+)
- pnpm (v8+ recommended, but works with 10.27.0+)
- MongoDB (local instance or cloud like MongoDB Atlas)
- **Ollama** (for AI features): Download from https://ollama.ai and pull the `llama3.2` model
  ```bash
  ollama pull llama3.2
  ```
  > **Note**: Ollama is optional - the app will still run without it, but fraud detection features will be limited.

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/NikhilKatkuri/certify-ai.git
cd certify-ai
```

### Step 2: Install Dependencies

The project uses pnpm for package management. You can install all dependencies at once or individually for each component.

**Install all (recommended):**

```bash
pnpm run install:all
```

**Or individually:**

- Client: `pnpm run install:client`
- Server: `pnpm run install:server`
- LLM (if using): `pnpm run install:llm`

This will navigate to the respective directories (client, backend, llm) and run pnpm install.

> **Note**: If you encounter issues with pnpm, ensure it's installed globally: `npm install -g pnpm`.

### Step 3: Set Up Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB URI (e.g., `mongodb://localhost:27017/certify-ai` for a local instance).

If using the LLM component, you may need additional variables in `llm/.env` (create if not present), such as model paths or API keys if integrating with external services. For example:

```
MODEL_PATH=/path/to/downloaded/model
LLM_PORT=2007
```

### Step 4: Set Up the LLM Component (Optional but Recommended for Full AI Features)

The LLM server handles AI-powered analysis. It may or may not be installed depending on your use case—if you're not using it, the platform can still run with basic functionality, but advanced fraud detection won't be available.

#### Download LLM Models:

The LLM component requires pre-trained models for certificate analysis. Download them from a trusted source (e.g., Hugging Face or official repositories).

Example: If using a model like GPT-J or a custom fine-tuned model for OCR/fraud detection, download it to a local directory.

Place the model files in `llm/models/` (create the folder if needed) or specify the path in your `.env` file.

Command example (if using Hugging Face CLI):

```bash
pip install huggingface-hub  # If not already installed via pnpm
huggingface-cli download <model-repo> --local-dir llm/models/
```

**Important**: Do this before starting the LLM server, as it needs the models to load. This step requires internet access and may take time depending on model size.

#### Verify Setup:

- Ensure the `llm/` directory has the necessary scripts and dependencies installed (from Step 2).
- The LLM server runs on `localhost:2007` by default. You can access it directly for testing (e.g., via curl or Postman) once running.

#### If you choose not to set up the LLM:

- The backend will log a warning and may use fallback methods (e.g., rule-based verification).
- Skip running the LLM in development mode.

### Step 5: Set Up and Start the Server (Backend)

Navigate to `backend/` if needed, but you can run from root.

Start the server:

```bash
pnpm run server
```

This runs `cd backend && npm run dev`.

The server will start on `localhost:4000`.

Ensure MongoDB is running and connected via the `.env` URI.

### Step 6: Set Up and Start the Client (Frontend)

Navigate to `client/` if needed, but you can run from root.

Start the client:

```bash
pnpm run client
```

This runs `cd client && npm start`.

The client will start on `localhost:3000`.

Open your browser to `http://localhost:3000` to access the app.

## Running All Components Together (Development Mode)

To run client, server, and LLM simultaneously:

```bash
pnpm run dev
```

This uses concurrently to start all three:

- Client on port 3000 (cyan console)
- Server on port 4000 (magenta console)
- LLM on port 2007 (yellow console)

> **Note**: If not using LLM, you can modify the dev script in `package.json` to exclude it, or run client and server separately.

## Available Scripts (from package.json)

These can be run from the root directory using `pnpm run <script>`:

- `client`: Starts the client (`cd client && npm start`)
- `server`: Starts the server (`cd backend && npm run dev`)
- `llm`: Starts the LLM server (`cd llm && npm run dev`)
- `install:client`: Installs client dependencies
- `install:server`: Installs server dependencies
- `install:llm`: Installs LLM dependencies
- `install:all`: Installs all dependencies
- `dev`: Runs all components concurrently

## Testing with Sample Certificates

Test certificates are included in the `sample/` directory:

- **`valid_cer.png`**: Valid certificate (should pass verification)
- **`fraud_cer.png`**: Fraudulent certificate (should be detected)
- **`manual_cer.png`**: Edge case certificate

### To test:

1. Start the application (e.g., via `pnpm run dev`).
2. Navigate to `http://localhost:3000` in your browser.
3. Go to the verification page.
4. Upload a certificate from the `sample/` folder.
5. View the AI analysis and verification results.

## How the Components Integrate

1. User uploads a certificate via the client (frontend).
2. Client sends the request to the server (backend) API on port 4000.
3. Server processes the request and, if LLM is running, queries the LLM server on port 2007 for AI analysis (e.g., OCR, fraud detection).
4. LLM returns results to the server.
5. Server stores data in MongoDB and responds to the client.
6. Client displays the results to the user.

> **Note**: If LLM is not running, the server may skip AI steps or use alternatives.

## Troubleshooting

- **Port Conflicts**: Ensure ports 2007, 3000, and 4000 are free.
- **Model Loading Errors**: Double-check model downloads and paths in LLM setup.
- **MongoDB Connection**: Verify your URI and that MongoDB is running.
- **Dependencies**: If issues arise, try deleting `node_modules` and reinstalling.

## contact

## For any questions or support, please contact:

- **Nikhil Katkuri**: [GitHub](https://github.com/NikhilKatkuri) | [LinkedIn](https://www.linkedin.com/in/katkurinikhil) | [email](mailto:nikhilprojects07k@gmail.com)

- **Joshitha Juturu**: [GitHub](https://github.com/joshithajuturu-org) | [LinkedIn](https://www.linkedin.com/in/juturu-joshitha-768178330/) | [email](mailto:nikhilprojects07k@gmail.com)

- **Ganesh Kurma**: [GitHub](https://github.com/Ganesh1-IFS) | [LinkedIn](https://www.linkedin.com/in/ganesh-kurma-59385632b/)

- **Deekshitha Konda**: [GitHub](https://github.com/kondadeekshita29-ship-it) | [LinkedIn](https://www.linkedin.com/in/deekshitha-konda-700282330/)

**Built with ❤️ by Stratify Minds**

For contributions or issues, open a pull request or issue on GitHub.
