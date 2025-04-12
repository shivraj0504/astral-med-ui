
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Variables to store the current state
  const state = {
    selectedDoctor: null,
    selectedDate: new Date(),
    selectedTimeSlot: null,
    searchQuery: '',
  };

  // DOM Elements
  const specialistCards = document.querySelectorAll('.specialist-card');
  const timeSlots = document.querySelectorAll('.time-slot');
  const datePills = document.querySelectorAll('.date-pill');
  const dateNavPrev = document.querySelector('.date-nav.prev');
  const dateNavNext = document.querySelector('.date-nav.next');
  const searchInput = document.querySelector('.search-input');
  const specialtySelect = document.querySelector('.specialty-select');
  const bookButton = document.querySelector('.book-button');

  // Initial state setup (simulate having the first doctor selected)
  state.selectedDoctor = specialistCards[0];
  state.selectedTimeSlot = timeSlots[2]; // The "2:00 PM" slot

  // Event Listeners
  // Specialist card selection
  specialistCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected class from all cards
      specialistCards.forEach(c => c.classList.remove('selected'));
      // Add selected class to clicked card
      this.classList.add('selected');
      // Update state
      state.selectedDoctor = this;
    });
  });

  // Time slot selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      // Remove selected class from all slots
      timeSlots.forEach(s => s.classList.remove('selected'));
      // Add selected class to clicked slot
      this.classList.add('selected');
      // Update state
      state.selectedTimeSlot = this;
    });
  });

  // Date pill selection
  datePills.forEach(pill => {
    pill.addEventListener('click', function() {
      // Remove selected class from all pills
      datePills.forEach(p => p.classList.remove('selected'));
      // Add selected class to clicked pill
      this.classList.add('selected');
      
      // Update state (in real app, would update the actual date object)
      const day = this.querySelector('.day-number').textContent;
      const newDate = new Date(state.selectedDate);
      newDate.setDate(parseInt(day));
      state.selectedDate = newDate;
    });
  });

  // Date navigation
  dateNavPrev.addEventListener('click', function() {
    // In real app, would update the date pills
    console.log('Navigate to previous date range');
  });
  
  dateNavNext.addEventListener('click', function() {
    // In real app, would update the date pills
    console.log('Navigate to next date range');
  });

  // Search functionality
  searchInput.addEventListener('input', function() {
    state.searchQuery = this.value.toLowerCase();
    filterSpecialists();
  });
  
  // Specialty filter
  specialtySelect.addEventListener('change', function() {
    filterSpecialists();
  });

  // Book appointment
  bookButton.addEventListener('click', function() {
    if (state.selectedDoctor && state.selectedTimeSlot) {
      showConfirmation();
    }
  });

  // Functions
  function filterSpecialists() {
    // In a real app, this would filter the specialists list
    console.log('Filtering specialists with query:', state.searchQuery);
    console.log('Specialty filter:', specialtySelect.value);
  }

  function showConfirmation() {
    // In a real app, this would show a confirmation UI
    console.log('Booking appointment...');
    
    // Simulate a successful booking after 1.5 seconds
    setTimeout(() => {
      alert('Appointment booked successfully!');
    }, 1500);
  }
  
  // Initialize the UI based on default selections
  initializeUI();
  
  function initializeUI() {
    // This would set up the initial state of the UI
    console.log('UI initialized with default selections');
  }
});
