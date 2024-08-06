async function getChatbotResponse(message) {
    "const apiUrl = 'http://localhost:3000/api/chat'; // Your backend endpoint"
    const apiUrl = 'https://shrouded-fjord-22624-f195efef797c.herokuapp.com/api/chat'; // Replace with your actual Heroku URL

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Fetch error: ', response.status, response.statusText, errorText);
            return 'Error: Unable to get response from chatbot';
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return 'Error: Unable to communicate with chatbot';
    }
}

function appendMessage(className, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    
    // Split the message by newline characters and create separate paragraphs
    message.split('\n').forEach(line => {
        const paragraph = document.createElement('p');
        paragraph.textContent = line;
        messageElement.appendChild(paragraph);
    });

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('user-message', userInput);
    document.getElementById('user-input').value = '';

    const response = await getChatbotResponse(userInput);
    appendMessage('bot-message', response);
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

window.addEventListener('load', () => {
    const welcomeMessage = "Hello! I'm your mental health assistant. How can I help you today?";
    appendMessage('bot-message', welcomeMessage);

    const userInput = document.getElementById('user-input');
    userInput.addEventListener('keydown', handleKeyDown);
});
