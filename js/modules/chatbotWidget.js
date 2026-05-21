/**
 * Chatbot Widget logic
 * Handles toggling, sending messages, and streaming responses from the backend.
 */

export function initChatbotWidget() {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const navChatbotBtn = document.getElementById('nav-chatbot-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');
    const submitBtn = document.getElementById('chatbot-submit');

    if (!toggleBtn || !chatbotWindow || !chatbotForm) {
        console.warn('Chatbot UI elements not found. Skipping init.');
        return;
    }

    // Generate a unique session ID for the user
    let sessionId = localStorage.getItem('portfolio_chat_session');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('portfolio_chat_session', sessionId);
    }

    // Toggle logic
    function toggleChat() {
        const isVisible = chatbotWindow.classList.contains('chatbot-visible');
        if (!isVisible) {
            chatbotWindow.classList.remove('chatbot-hidden');
            chatbotWindow.classList.add('chatbot-visible');
            chatbotInput.focus();
            toggleBtn.classList.remove('glow-effect'); // Stop pulsing once opened
        } else {
            chatbotWindow.classList.remove('chatbot-visible');
            chatbotWindow.classList.add('chatbot-hidden');
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    if (navChatbotBtn) {
        navChatbotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isVisible = chatbotWindow.classList.contains('chatbot-visible');
            if (!isVisible) {
                toggleChat();
            }
        });
    }

    // Auto scroll to bottom
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Append a message to the UI
    function appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        if (role === 'user') {
            msgDiv.classList.add('user-message');
        } else if (role === 'error') {
            msgDiv.classList.add('error-message');
        } else {
            msgDiv.classList.add('ai-message');
        }

        const p = document.createElement('p');
        p.textContent = text;
        msgDiv.appendChild(p);

        let targetElement = msgDiv;

        if (role === 'ai') {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('message-row');

            const avatar = document.createElement('img');
            avatar.src = 'assets/chatbot_logo.webp';
            avatar.alt = 'AI';
            avatar.classList.add('message-avatar');

            rowDiv.appendChild(avatar);
            rowDiv.appendChild(msgDiv);
            targetElement = rowDiv;
        }

        messagesContainer.appendChild(targetElement);
        scrollToBottom();
        return p; // Return the text element in case we want to stream into it
    }

    // Handle form submission
    chatbotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Clear input and show user message
        chatbotInput.value = '';
        chatbotInput.disabled = true;
        submitBtn.disabled = true;
        appendMessage('user', message);

        // Prepare AI message placeholder
        const aiMessageText = appendMessage('ai', '');
        aiMessageText.innerHTML = '<span class="status-dot pulsing"></span>'; // Loading indicator

        try {
            // Encode parameters
            const params = new URLSearchParams({
                session_id: sessionId,
                message: message
            });

            // Use EventSource for SSE streaming
            const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:8000'
                : 'https://viv-19-rag-portfolio.hf.space';
            const url = `${apiBase}/api/chat/stream?${params.toString()}`;
            const eventSource = new EventSource(url);
            
            let fullResponse = '';
            let isFirstChunk = true;

            eventSource.onmessage = (event) => {
                if (event.data === '[DONE]') {
                    eventSource.close();
                    chatbotInput.disabled = false;
                    submitBtn.disabled = false;
                    chatbotInput.focus();
                    return;
                }

                try {
                    const data = JSON.parse(event.data);
                    if (data.error) {
                        if (isFirstChunk) {
                            aiMessageText.innerHTML = '';
                        }
                        appendMessage('error', data.error);
                        eventSource.close();
                        chatbotInput.disabled = false;
                        submitBtn.disabled = false;
                        return;
                    }

                    if (data.chunk) {
                        if (isFirstChunk) {
                            aiMessageText.innerHTML = ''; // Remove loading indicator
                            isFirstChunk = false;
                        }
                        fullResponse += data.chunk;
                        if (typeof marked !== 'undefined') {
                            aiMessageText.innerHTML = marked.parse(fullResponse);
                        } else {
                            aiMessageText.textContent = fullResponse;
                        }
                        scrollToBottom();
                    }
                } catch (err) {
                    console.error('Error parsing SSE chunk:', err, event.data);
                }
            };

            eventSource.onerror = (err) => {
                console.error('EventSource failed:', err);
                eventSource.close();
                if (isFirstChunk) {
                    aiMessageText.innerHTML = 'Sorry, the connection to the assistant was lost.';
                }
                chatbotInput.disabled = false;
                submitBtn.disabled = false;
            };

        } catch (error) {
            console.error('Chat error:', error);
            aiMessageText.innerHTML = '';
            appendMessage('error', 'Could not connect to the backend server. Is it running?');
            chatbotInput.disabled = false;
            submitBtn.disabled = false;
        }
    });
}
