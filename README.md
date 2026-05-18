# Personal Portfolio — Vivesh Kumar Singh

A premium, agent-themed full-stack portfolio showcasing projects and skills in AI Engineering and Backend Development, featuring an interactive **RAG AI Assistant** to answer recruiter queries in real-time.

## Features

- **RAG AI Chatbot**: An interactive portfolio assistant powered by **Groq (Llama 3.1 8B)** and **ChromaDB** vector store to answer real-time questions about Vivesh's career, education, and projects using local portfolio data.
- **Premium Agentic UI**: Sleek, high-performance dark-themed design with a floating chatbot logo, floating/bouncing animations, and full responsiveness.
- **Modular Frontend Architecture**: Built purely with HTML, Vanilla CSS, and modern ES Modules loaded via dynamic component injections.
- **Dynamic Glitch Effects**: Interactive typing and glitch animations for skills, hero headers, and titles.

---

## How to Run Locally

To run the full-stack application (frontend + AI assistant), you need to start both the static frontend server and the FastAPI backend server.

### 1. Run the Frontend (Port 3000)
This site uses **ES modules** and **HTML partials** loaded via `fetch`. You need a local HTTP server to load components.

**Option A — VS Code Live Server (recommended)**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `index.html` → **Open with Live Server**.

**Option B — npx serve**
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

### 2. Run the AI Assistant Backend (Port 8000)
The chatbot connects to a local FastAPI server running the RAG pipeline.

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Activate the virtual environment**:
   *   **Windows (PowerShell)**:
       ```powershell
       .\venv\Scripts\Activate.ps1
       ```
   *   **macOS/Linux**:
       ```bash
       source venv/bin/activate
       ```
3. **Install dependencies** (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```
4. **Create a `.env` file** in the `backend/` directory and configure your Groq API Keys:
   ```env
   GROQ_API_KEY_1=your-primary-groq-key
   GROQ_API_KEY_2=your-backup-groq-key
   ```
5. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

---

## Project Structure

```
├── index.html              # Shell page (holds navbar, sections, chatbot mounts)
├── components/             # HTML partials (one per UI section)
│   ├── navbar.html         # Custom navigation bar with RAG Trigger
│   ├── hero.html
│   ├── skills.html
│   ├── projects.html
│   ├── experience.html
│   ├── chatbot.html        # Floating Chatbot Window & toggling FAB markup
│   └── contact.html
├── css/
│   ├── main.css            # Imports all stylesheets
│   ├── base/               # Variables, reset, utilities
│   ├── components/         # Section-specific styles (e.g. chatbot.css)
│   └── layout/             # Responsive layouts & breakpoints
├── js/
│   ├── main.js             # Bootstrap: loads all components and boots logic
│   ├── config/             # Config files for partial order & site copy
│   └── modules/            # JS features (glitch, scroll reveal, chatbotWidget.js)
├── backend/                # Python RAG Chatbot Backend
│   ├── app/
│   │   ├── main.py         # FastAPI Entrypoint (SSE Streaming endpoint)
│   │   ├── rag/            # Groq LLM + LangChain RAG pipeline
│   │   ├── vectorstore/    # ChromaDB integration client
│   │   └── memory/         # In-memory chat history management
│   ├── requirements.txt    # Python dependencies
│   └── venv/               # Local virtual environment
└── assets/                 # Images, custom logos, and resume PDF
```

---

## Where to Edit Content

| What to change | File |
|----------------|------|
| Nav links, section markup | `components/*.html` |
| Chatbot UI layout | `components/chatbot.html` |
| Chatbot styling | `css/components/chatbot.css` |
| Chatbot connection/streaming logic | `js/modules/chatbotWidget.js` |
| Colors, fonts, spacing | `css/base/variables.css` |
| Load order of partials | `js/config/components.js` |
