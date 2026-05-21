# Deployment Guide — Vivesh's Portfolio & RAG Chatbot

This guide provides a step-by-step walkthrough to deploy your personal portfolio on **GitHub Pages** (using your custom domain `vivesh.me`) and the backend RAG chatbot on **Hugging Face Spaces**.

---

## Architecture Overview

*   **Frontend (Static SPA)**: Deployed to **GitHub Pages** (via your user page repository `Viv-19.github.io` or your project repo). It is mapped to your custom domain `vivesh.me`.
*   **Backend (FastAPI RAG)**: Deployed to a **Hugging Face Space** using the **Docker SDK**. It is completely free and provides **16GB of RAM**, ensuring your local embedding model (`BAAI/bge-small-en-v1.5`) loads and runs stably.

---

## Step 1: Optimize Image Assets (Done!)

We have successfully compressed your PNG assets into the `.webp` format.
*   **Original Size**: ~23.4 MB
*   **Optimized Size**: ~0.8 MB (a **96% reduction**!)
*   **Status**: All file paths and imports in `index.html`, `js/config/experience.js`, `js/modules/chatbotWidget.js`, and `components/*.html` have been updated to point to `.webp`. The original files are safely backed up in the `assets_backup/` directory.

---

## Step 2: Deploy the Backend to Hugging Face Spaces

1.  **Create a Hugging Face Account**: If you don't have one, sign up at [huggingface.co](https://huggingface.co).
2.  **Create a New Space**:
    *   Go to [huggingface.co/new-space](https://huggingface.co/new-space).
    *   **Space Name**: `rag-portfolio` (or any name you prefer).
    *   **SDK**: Select **Docker**.
    *   **Template**: Choose **Blank** (do not select a template).
    *   **Space Hardware**: Choose **CPU basic (2 vCPU · 16 GB RAM · Free)**.
    *   **Visibility**: Choose **Public** (required for the free tier; this is standard for portfolios).
3.  **Upload the Code**:
    *   You can clone the Space repo using git, or upload files directly through the Hugging Face web UI.
    *   Upload the following files and folders to the root of the Space repository:
        *   `Dockerfile` (created at the root of your workspace)
        *   `RAG data/` (entire folder containing your markdown documents)
        *   `backend/` (entire folder containing `app/` and `requirements.txt`. Exclude `venv/` and `chroma_data/` if they exist locally).
4.  **Configure API Secrets**:
    *   In your Hugging Face Space page, navigate to the **Settings** tab.
    *   Scroll down to **Variables and secrets**.
    *   Click **New secret** and add your Groq API keys:
        *   **Name**: `GROQ_API_KEY_1`
        *   **Value**: *Your Groq API key*
        *   **Name**: `GROQ_API_KEY_2` *(Optional fallback)*
        *   **Value**: *Your backup Groq API key*
5.  **Build and Launch**:
    *   Hugging Face will automatically detect the `Dockerfile` and start building the container.
    *   Once building completes, the space status will change to **Running**.
    *   Your backend URL will be: `https://<hf-username>-<space-name>.hf.space` (e.g., `https://viv-19-rag-portfolio.hf.space`).
    *   Test it by visiting `https://<hf-username>-<space-name>.hf.space/` in your browser. You should see:
        ```json
        {"status": "AI Assistant Backend is running."}
        ```

---

## Step 3: Deploy the Frontend to GitHub Pages

You have two options to deploy the static frontend files:

### Option A: Push to `Viv-19.github.io` Repository (Recommended)
Since your screenshot shows that `Viv-19/Viv-19.github.io` is already set up with a custom domain `vivesh.me`, pushing your frontend files directly to this repo will deploy them immediately:

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/Viv-19/Viv-19.github.io.git
    cd Viv-19.github.io
    ```
2.  **Copy Frontend Files**:
    Copy the following folders and files from your `my portfolio` directory into the `Viv-19.github.io` directory:
    *   `assets/` (WebP images)
    *   `components/` (HTML partials)
    *   `css/` (styles)
    *   `js/` (JavaScript code)
    *   `index.html` (entry point)
    *   *Do NOT copy the `backend`, `RAG data`, `Dockerfile`, or `venv` directories — they are not needed for the frontend.*
3.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "Deploy optimized portfolio frontend"
    git push origin main
    ```

### Option B: Deploy directly from `rag-portfolio` Repository
If you prefer to keep everything in one repository and deploy Pages from there:
1.  Go to the settings of your `Viv-19/rag-portfolio` repository.
2.  Under **Pages**, select **Deploy from a branch** (choose `main` and root `/`).
3.  Under **Custom Domain**, enter `vivesh.me` and click save.
4.  Ensure a `CNAME` file exists in the root of the `main` branch with the contents `vivesh.me`.

---

## Step 4: Configure Domain DNS (for `vivesh.me`)

Ensure your DNS provider (from where you got `vivesh.me`) is configured to point to GitHub Pages. In your DNS settings panel:

1.  Create **A Records** pointing to GitHub Pages IP addresses:
    *   `185.199.108.153`
    *   `185.199.109.153`
    *   `185.199.110.153`
    *   `185.199.111.153`
2.  Create **AAAA Records** (for IPv6 support):
    *   `2606:50c0:8000::153`
    *   `2606:50c0:8001::153`
    *   `2606:50c0:8002::153`
    *   `2606:50c0:8003::153`
3.  Create a **CNAME Record**:
    *   **Host**: `www`
    *   **Value**: `Viv-19.github.io.` (make sure to include the ending dot if required by your registrar).

---

## Step 5: Verify & Connect

1.  Open your website at `https://vivesh.me`.
2.  Verify that all images load instantly.
3.  Open the chatbot widget and send a message. It should dynamically detect that it's running in production and stream responses directly from your Hugging Face Space backend!

*Note: If your Hugging Face username or Space name differs from `viv-19-rag-portfolio`, update the production fallback URL in `js/modules/chatbotWidget.js` on line 118 before pushing to GitHub Pages.*
