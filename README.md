# 🚀 CodeForge AI

> AI-Powered GitHub Repository Analysis Platform

CodeForge AI is an intelligent developer tool that analyzes GitHub repositories using Artificial Intelligence. It helps developers understand unfamiliar codebases by providing repository insights, semantic code search, AI-powered explanations, automated code reviews, security analysis, documentation generation, and interactive architecture visualization.

---

## ✨ Features

### 📂 Repository Analysis
- Clone and analyze any public GitHub repository
- Parse repository structure
- Generate repository summary
- Interactive file explorer

### 🤖 AI Code Intelligence
- Explain source code using Gemini AI
- AI-powered code review
- Code optimization suggestions
- Automatic unit test generation

### 💬 Repository Chat
- Ask questions about the repository
- Repository-aware AI assistant
- Retrieval-Augmented Generation (RAG) using ChromaDB

### 🔍 Semantic Search
- Search repositories using natural language
- Vector similarity search
- Context-aware code retrieval

### 🔐 Security Scanner
- Detect common security issues
- Repository security report
- Risk categorization

### 📊 Repository Dashboard
- Repository metrics
- Language distribution
- File statistics
- Dependency analysis

### 🏗 Architecture Visualization
- Interactive repository graph
- Repository structure visualization

### 📄 AI Documentation Generator
- Generate project documentation
- Architecture overview
- Folder descriptions
- Installation guide
- Technology summary

---

# 🖥 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Flow
- Monaco Editor

## Backend

- FastAPI
- Python
- GitPython

## Artificial Intelligence

- Google Gemini AI
- ChromaDB
- Semantic Search
- Retrieval-Augmented Generation (RAG)

## Libraries

- React Markdown
- Remark GFM
- Tree-sitter
- NetworkX

---

# 🏛 Architecture

```
GitHub Repository
        │
        ▼
 Repository Cloner
        │
        ▼
 Repository Parser
        │
        ▼
 Repository Analyzer
        │
        ├─────────────► Security Scanner
        │
        ├─────────────► Symbol Index
        │
        ├─────────────► Dependency Analyzer
        │
        ├─────────────► Call Graph Builder
        │
        ├─────────────► Metrics Generator
        │
        ▼
 Code Chunker
        │
        ▼
 ChromaDB Vector Store
        │
        ▼
 Gemini AI
        │
        ▼
 Frontend Dashboard
```

---

# 📷 Features Overview

- Repository Dashboard
- File Explorer
- Monaco Code Editor
- AI Code Explain
- AI Code Review
- AI Test Generation
- AI Optimization
- Semantic Search
- Repository Chat
- Security Scanner
- Architecture Graph
- Documentation Generator

---

# 📁 Project Structure

```
frontend/
│
├── app/
├── components/
├── lib/
└── public/

backend/
│
├── api/
├── services/
├── parser/
├── ai/
├── chunker/
├── vectorstore/
└── utils/
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/suyash3110/codeforge-ai.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 📌 Future Improvements

- Authentication
- Multi-repository analysis
- Pull Request Review
- GitHub OAuth
- Team Collaboration
- Repository History Analysis
- CI/CD Integration
- Multi-LLM Support
- Docker Deployment

---

# 👨‍💻 Author

**Suyash Ranjan**

- GitHub: https://github.com/suyash3110
- LinkedIn: https://linkedin.com/in/suyash-ranjan-01148a327

---

# ⭐ If you found this project useful, consider giving it a star.