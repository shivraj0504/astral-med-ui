
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const bodyOutline = document.querySelector('.body-outline');
  const bodyMarkers = document.querySelectorAll('.body-marker');
  const rotateLeftButton = document.getElementById('rotateLeft');
  const rotateRightButton = document.getElementById('rotateRight');
  const resetViewButton = document.getElementById('resetView');
  
  // Variables
  let currentRotation = 0;
  let isDragging = false;
  let startX = 0;
  let rotationSpeed = 0.5;
  
  // Add event listeners
  rotateLeftButton.addEventListener('click', rotateLeft);
  rotateRightButton.addEventListener('click', rotateRight);
  resetViewButton.addEventListener('click', resetView);
  
  // Mouse events for drag rotation
  const bodyModelPlaceholder = document.querySelector('.body-model-placeholder');
  
  bodyModelPlaceholder.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const rotation = deltaX * rotationSpeed;
    
    currentRotation += rotation;
    updateRotation();
    
    startX = e.clientX;
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
  
  // Handle body marker clicks
  bodyMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
      const organ = this.getAttribute('data-organ');
      showOrganInfo(organ);
    });
  });
  
  // Initialize
  function init() {
    // Update current time for "Last updated"
    const updatedTimeElement = document.querySelector('.updated-time');
    if (updatedTimeElement) {
      updatedTimeElement.textContent = 'Just now';
    }
    
    // Start subtle auto-rotation
    startAutoRotation();
  }
  
  // Auto-rotation
  let autoRotationInterval;
  
  function startAutoRotation() {
    autoRotationInterval = setInterval(() => {
      if (!isDragging) {
        currentRotation += 0.1;
        updateRotation();
      }
    }, 50);
  }
  
  function stopAutoRotation() {
    clearInterval(autoRotationInterval);
  }
  
  // Rotation functions
  function rotateLeft() {
    stopAutoRotation();
    currentRotation -= 30;
    updateRotation();
  }
  
  function rotateRight() {
    stopAutoRotation();
    currentRotation += 30;
    updateRotation();
  }
  
  function resetView() {
    stopAutoRotation();
    currentRotation = 0;
    updateRotation();
    startAutoRotation();
  }
  
  function updateRotation() {
    bodyOutline.style.transform = `rotateY(${currentRotation}deg)`;
  }
  
  // Show organ information
  function showOrganInfo(organ) {
    let organInfo = '';
    
    switch (organ) {
      case 'brain':
        organInfo = 'Brain: Controls the nervous system and cognitive functions.';
        break;
      case 'heart':
        organInfo = 'Heart: Pumps blood throughout the body.';
        break;
      case 'lungs':
        organInfo = 'Lungs: Responsible for respiration and oxygen exchange.';
        break;
      case 'stomach':
        organInfo = 'Stomach: Digests food and absorbs nutrients.';
        break;
      default:
        organInfo = 'Select an organ to see information.';
    }
    
    // In a real app, this would show a tooltip or panel with information
    console.log(organInfo);
    
    // Simple alert for demonstration
    alert(organInfo);
  }
  
  // Initialize the application
  init();
});
