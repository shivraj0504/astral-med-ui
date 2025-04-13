
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  const togglePasswordButton = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  
  if (togglePasswordButton && passwordInput) {
    const eyeIcon = togglePasswordButton.querySelector('.eye-icon');
    
    togglePasswordButton.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle eye icon
      eyeIcon.classList.toggle('visible');
    });
  }
  
  // Form submission
  const authForm = document.querySelector('.auth-form');
  
  if (authForm) {
    authForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // For login form
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      
      if (emailInput && passwordInput) {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!email) {
          showError(emailInput, 'Email is required');
          return;
        }
        
        if (!isValidEmail(email)) {
          showError(emailInput, 'Please enter a valid email');
          return;
        }
        
        if (!password) {
          showError(passwordInput, 'Password is required');
          return;
        }
        
        // For signup form
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (confirmPasswordInput) {
          const confirmPassword = confirmPasswordInput.value;
          
          if (password !== confirmPassword) {
            showError(confirmPasswordInput, 'Passwords do not match');
            return;
          }
          
          const termsCheckbox = document.getElementById('termsAgree');
          
          if (termsCheckbox && !termsCheckbox.checked) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
          }
        }
        
        // Simulate successful submission
        simulateSuccessfulSubmission();
      }
    });
    
    // Input focus/blur events to handle errors
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        clearError(this);
      });
      
      input.addEventListener('blur', function() {
        const value = this.value.trim();
        
        if (!value && this.hasAttribute('required')) {
          showError(this, 'This field is required');
        } else if (this.id === 'email' && value && !isValidEmail(value)) {
          showError(this, 'Please enter a valid email');
        }
      });
    });
  }
  
  // Social auth buttons
  const socialButtons = document.querySelectorAll('.social-auth-button');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.classList.contains('google') ? 'Google' : 'Apple';
      alert(`${provider} authentication would happen here`);
    });
  });
  
  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showError(inputElement, message) {
    clearError(inputElement);
    
    inputElement.style.borderColor = '#ff6b6b';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    
    inputElement.parentNode.appendChild(errorElement);
  }
  
  function clearError(inputElement) {
    inputElement.style.borderColor = '';
    
    const existingError = inputElement.parentNode.querySelector('.input-error');
    if (existingError) {
      existingError.remove();
    }
  }
  
  function simulateSuccessfulSubmission() {
    // In a real app, this would submit the form to a server
    const isLoginPage = !document.getElementById('confirmPassword');
    const redirectPage = isLoginPage ? './index.html' : './login.html';
    
    // Show loading state
    const submitButton = document.querySelector('.auth-button');
    const originalContent = submitButton.innerHTML;
    submitButton.innerHTML = `
      <div class="loading-spinner"></div>
      ${isLoginPage ? 'Logging in...' : 'Creating account...'}
    `;
    submitButton.style.pointerEvents = 'none';
    
    // Add the loading spinner style
    const style = document.createElement('style');
    style.textContent = `
      .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(0,0,0,0.3);
        border-top-color: rgba(0,0,0,0.8);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Simulate API request delay
    setTimeout(() => {
      window.location.href = redirectPage;
    }, 1500);
  }
});
