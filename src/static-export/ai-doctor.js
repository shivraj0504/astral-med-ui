
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const chatMessages = document.getElementById('chatMessages');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const symptomButtons = document.querySelectorAll('.symptom-button');
  const selectedSymptomContainer = document.getElementById('selectedSymptomContainer');
  
  // Variables
  let selectedSymptom = null;
  let isAnalyzing = false;
  let messageId = 1;
  
  // Bot responses
  const botResponses = [
    "Based on your symptoms, it could be a common cold. I recommend rest and plenty of fluids.",
    "Your symptoms might indicate a migraine. Have you experienced sensitivity to light?",
    "This could be related to stress or anxiety. Consider taking short breaks during the day.",
    "I'll need more information to provide an accurate assessment. Could you describe your symptoms in more detail?"
  ];
  
  // Add event listeners
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  symptomButtons.forEach(button => {
    button.addEventListener('click', function() {
      const symptom = this.getAttribute('data-symptom');
      selectSymptom(symptom);
      
      // Update button states
      symptomButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Initialize
  function init() {
    // Update current time for "Last updated"
    const updatedTimeElement = document.querySelector('.updated-time');
    if (updatedTimeElement) {
      updatedTimeElement.textContent = 'Just now';
    }
  }
  
  // Function to select a symptom
  function selectSymptom(symptom) {
    selectedSymptom = symptom;
    updateSelectedSymptomUI();
  }
  
  // Update the selected symptom UI
  function updateSelectedSymptomUI() {
    selectedSymptomContainer.innerHTML = '';
    
    if (selectedSymptom) {
      const symptomElement = document.createElement('div');
      symptomElement.className = 'selected-symptom';
      symptomElement.innerHTML = `
        ${selectedSymptom}
        <span class="close-icon" id="clearSymptom"></span>
      `;
      selectedSymptomContainer.appendChild(symptomElement);
      
      // Add event listener to clear symptom
      document.getElementById('clearSymptom').addEventListener('click', function() {
        selectedSymptom = null;
        updateSelectedSymptomUI();
        symptomButtons.forEach(btn => btn.classList.remove('active'));
      });
    }
  }
  
  // Function to send a message
  function sendMessage() {
    const text = messageInput.value.trim();
    
    // Don't send empty messages unless a symptom is selected
    if (!text && !selectedSymptom) return;
    
    const messageContent = selectedSymptom || text;
    
    // Add user message to chat
    addMessage(messageContent, false);
    
    // Clear input and selected symptom
    messageInput.value = '';
    selectedSymptom = null;
    updateSelectedSymptomUI();
    symptomButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show "analyzing" message
    showAnalyzing();
    
    // Simulate bot response after delay
    setTimeout(() => {
      hideAnalyzing();
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addMessage(randomResponse, true);
    }, 2000);
  }
  
  // Function to add a message to the chat
  function addMessage(text, isBot) {
    const messageElement = document.createElement('div');
    messageElement.className = isBot ? 'bot-message' : 'user-message';
    
    const iconClass = isBot ? 'bot-icon' : 'user-icon';
    const bubbleClass = isBot ? 'bot' : 'user';
    
    messageElement.innerHTML = `
      <div class="message-avatar">
        <span class="${iconClass}"></span>
      </div>
      <div class="message-bubble ${bubbleClass}">
        ${text}
      </div>
    `;
    
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Increment message ID
    messageId++;
  }
  
  // Show "analyzing" message
  function showAnalyzing() {
    isAnalyzing = true;
    const analyzeElement = document.createElement('div');
    analyzeElement.id = 'analyzing';
    analyzeElement.className = 'analyzing';
    analyzeElement.innerHTML = `
      <span class="brain-icon"></span>
      Analyzing your symptoms...
    `;
    chatMessages.appendChild(analyzeElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Hide "analyzing" message
  function hideAnalyzing() {
    isAnalyzing = false;
    const analyzeElement = document.getElementById('analyzing');
    if (analyzeElement) {
      analyzeElement.remove();
    }
  }
  
  // Initialize the application
  init();
});
