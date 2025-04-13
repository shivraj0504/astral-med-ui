
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const bedTypeOptions = document.querySelectorAll('.bed-type-option');
  const bedCards = document.querySelectorAll('.bed-card');
  const viewBedsButtons = document.querySelectorAll('.view-beds-button');
  const reservationDateInput = document.getElementById('reservationDate');
  const reservationDurationInput = document.getElementById('reservationDuration');
  const numberDecrementBtn = document.querySelector('.number-decrement');
  const numberIncrementBtn = document.querySelector('.number-increment');
  const reserveButton = document.querySelector('.reserve-button');
  const hospitalSearch = document.getElementById('hospitalSearch');
  const bedTypeFilter = document.getElementById('bedTypeFilter');
  const sortFilter = document.getElementById('sortFilter');
  const insuranceProviderSelect = document.getElementById('insuranceProvider');
  const policyNumberInput = document.getElementById('policyNumber');
  const verifyInsuranceCheckbox = document.getElementById('verifyInsurance');
  
  // Variables
  let selectedHospitalId = '1'; // Default selected hospital
  let selectedBedType = 'regular'; // Default bed type
  let reservationDuration = 3; // Default duration
  
  // Initialize
  function init() {
    // Update current time for "Last updated"
    const updatedTimeElement = document.querySelector('.updated-time');
    if (updatedTimeElement) {
      updatedTimeElement.textContent = 'Just now';
    }
    
    // Initialize date picker (in a real app, would use a date picker library)
    reservationDateInput.addEventListener('click', function() {
      alert('Date picker would open here in a real application');
    });
    
    // Update pricing
    updatePricing();
  }
  
  // Event Listeners
  // Bed type option selection
  bedTypeOptions.forEach(option => {
    const radioInput = option.querySelector('input[type="radio"]');
    
    radioInput.addEventListener('change', function() {
      if (this.checked) {
        selectedBedType = this.value;
        updateBedTypeDisplay(selectedBedType);
        updatePricing();
      }
    });
  });
  
  // View beds button click events
  viewBedsButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.bed-card');
      if (card) {
        const hospitalId = card.getAttribute('data-hospital-id');
        updateSelectedHospital(hospitalId);
        
        // Scroll to booking form
        const bookingPanel = document.querySelector('.bed-booking-panel');
        if (bookingPanel) {
          bookingPanel.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Reservation duration controls
  numberDecrementBtn.addEventListener('click', function() {
    const currentValue = parseInt(reservationDurationInput.value);
    if (currentValue > 1) {
      reservationDurationInput.value = currentValue - 1;
      reservationDuration = currentValue - 1;
      updatePricing();
    }
  });
  
  numberIncrementBtn.addEventListener('click', function() {
    const currentValue = parseInt(reservationDurationInput.value);
    if (currentValue < 30) {
      reservationDurationInput.value = currentValue + 1;
      reservationDuration = currentValue + 1;
      updatePricing();
    }
  });
  
  reservationDurationInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 30) value = 30;
    
    this.value = value;
    reservationDuration = value;
    updatePricing();
  });
  
  // Search and filter
  hospitalSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    // In a real app, this would filter the hospital cards
    if (searchTerm) {
      console.log('Searching for hospitals:', searchTerm);
    }
  });
  
  bedTypeFilter.addEventListener('change', function() {
    const bedType = this.value;
    console.log('Filtering by bed type:', bedType || 'all');
    
    // In a real app, this would filter the hospital cards
  });
  
  sortFilter.addEventListener('change', function() {
    const sortBy = this.value;
    console.log('Sorting by:', sortBy);
    
    // In a real app, this would sort the hospital cards
  });
  
  // Insurance fields
  insuranceProviderSelect.addEventListener('change', function() {
    const provider = this.value;
    if (provider) {
      console.log('Selected insurance provider:', provider);
    }
  });
  
  // Reserve button
  reserveButton.addEventListener('click', function() {
    // Validate form
    const patientName = document.getElementById('patientName').value.trim();
    const patientAge = document.getElementById('patientAge').value.trim();
    const patientGender = document.getElementById('patientGender').value;
    const medicalCondition = document.getElementById('medicalCondition').value.trim();
    const insuranceProvider = document.getElementById('insuranceProvider').value;
    const policyNumber = document.getElementById('policyNumber').value.trim();
    const verifyInsurance = document.getElementById('verifyInsurance').checked;
    
    if (!patientName) {
      alert('Please enter patient name');
      return;
    }
    
    if (!patientAge) {
      alert('Please enter patient age');
      return;
    }
    
    if (!patientGender) {
      alert('Please select patient gender');
      return;
    }
    
    if (!medicalCondition) {
      alert('Please describe the medical condition');
      return;
    }
    
    if (!verifyInsurance) {
      alert('Please consent to insurance verification');
      return;
    }
    
    if (insuranceProvider && !policyNumber) {
      alert('Please enter policy number');
      return;
    }
    
    // Show loading state
    const originalText = reserveButton.textContent;
    reserveButton.innerHTML = '<div class="button-spinner"></div> Processing...';
    reserveButton.disabled = true;
    
    // Add spinner style
    const style = document.createElement('style');
    style.textContent = `
      .button-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(0,0,0,0.3);
        border-top-color: rgba(0,0,0,0.8);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 8px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Simulate API request
    setTimeout(() => {
      alert('Bed reserved successfully! A confirmation email has been sent.');
      reserveButton.textContent = originalText;
      reserveButton.disabled = false;
    }, 1500);
  });
  
  // Functions
  // Update selected hospital
  function updateSelectedHospital(hospitalId) {
    selectedHospitalId = hospitalId;
    
    // In a real app, this would fetch hospital details from an API
    // Here we'll just update the UI with some static data
    
    const hospitals = {
      '1': {
        name: 'City General Hospital',
        distance: '2.1 miles away',
        rating: 4.8,
        bedTypes: {
          regular: { available: 15, total: 80, price: 500 },
          icu: { available: 7, total: 20, price: 1200 },
          emergency: { available: 12, total: 20, price: 800 }
        }
      },
      '2': {
        name: 'Heart & Vascular Institute',
        distance: '3.5 miles away',
        rating: 4.9,
        bedTypes: {
          regular: { available: 8, total: 30, price: 600 },
          icu: { available: 3, total: 10, price: 1400 },
          cardiac: { available: 5, total: 15, price: 1000 }
        }
      },
      '4': {
        name: 'Children\'s Medical Center',
        distance: '7.8 miles away',
        rating: 4.6,
        bedTypes: {
          regular: { available: 4, total: 40, price: 550 },
          picu: { available: 2, total: 15, price: 1300 },
          nicu: { available: 3, total: 25, price: 1500 }
        }
      }
    };
    
    const hospital = hospitals[hospitalId] || hospitals['1'];
    
    // Update hospital details
    document.querySelector('.selected-hospital-name').textContent = hospital.name;
    document.querySelector('.hospital-distance').textContent = hospital.distance;
    document.querySelector('.hospital-rating').innerHTML = `${hospital.rating} <span class="star-icon-small"></span>`;
    
    // Update bed options
    updateBedOptions(hospital.bedTypes);
    
    // Update pricing
    updatePricing();
  }
  
  // Update bed options display
  function updateBedOptions(bedTypes) {
    const bedTypeOptions = document.querySelectorAll('.bed-type-option');
    
    // Update regular bed
    if (bedTypes.regular) {
      const regularOption = document.getElementById('regularBed').parentNode;
      const availabilityEl = regularOption.querySelector('.bed-option-availability');
      availabilityEl.textContent = `${bedTypes.regular.available} available`;
    }
    
    // Update ICU bed
    if (bedTypes.icu) {
      const icuOption = document.getElementById('icuBed').parentNode;
      const availabilityEl = icuOption.querySelector('.bed-option-availability');
      availabilityEl.textContent = `${bedTypes.icu.available} available`;
    }
    
    // Update emergency bed
    if (bedTypes.emergency) {
      const emergencyOption = document.getElementById('emergencyBed').parentNode;
      const availabilityEl = emergencyOption.querySelector('.bed-option-availability');
      availabilityEl.textContent = `${bedTypes.emergency.available} available`;
    }
  }
  
  // Update bed type display
  function updateBedTypeDisplay(bedType) {
    // Update price breakdown
    const priceItemEl = document.querySelector('.price-row:first-child .price-item');
    
    switch (bedType) {
      case 'regular':
        priceItemEl.textContent = 'Regular Bed';
        break;
      case 'icu':
        priceItemEl.textContent = 'ICU Bed';
        break;
      case 'emergency':
        priceItemEl.textContent = 'Emergency Bed';
        break;
      default:
        priceItemEl.textContent = 'Regular Bed';
    }
  }
  
  // Update pricing
  function updatePricing() {
    // Price per bed type (in a real app, this would come from an API)
    const bedPrices = {
      '1': { // City General
        regular: 500,
        icu: 1200,
        emergency: 800
      },
      '2': { // Heart & Vascular
        regular: 600,
        icu: 1400,
        cardiac: 1000
      },
      '4': { // Children's Medical
        regular: 550,
        picu: 1300,
        nicu: 1500
      }
    };
    
    const hospitalPrices = bedPrices[selectedHospitalId] || bedPrices['1'];
    const bedPrice = hospitalPrices[selectedBedType] || hospitalPrices.regular;
    
    // Update price elements
    const priceValueEl = document.querySelector('.price-row:first-child .price-value');
    const durationValueEl = document.querySelector('.price-row:nth-child(2) .price-value');
    const totalValueEl = document.querySelector('.price-row.total .price-value');
    
    priceValueEl.textContent = `$${bedPrice} per day`;
    durationValueEl.textContent = `${reservationDuration} days`;
    totalValueEl.textContent = `$${bedPrice * reservationDuration}`;
  }
  
  // Initialize the application
  init();
});
