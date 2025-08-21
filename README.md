# AI-Powered Note Taking for Doctors

An AI-powered note-taking app designed for doctors to record, transcribe, and save client notes directly to local storage. The app features secure OpenAI integration and separates frontend and backend for safety.

## Features

- Record audio notes for clients
- AI-powered transcription of recordings
- Save notes to local storage for offline access
- Secure OpenAI API integration (API key never exposed to client-side)
- Easy setup for development

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

## Installation

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
 ```

2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the backend folder:


4. Open the .env file and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

5. Start the backend server:
```bash
nodemon index.js
```

The backend handles all communication with OpenAI to keep your API key secure.


# Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```
# Security Note
All communication with OpenAI happens via the backend

API keys are never exposed on the client-side

This ensures secure integration and prevents unauthorized use
