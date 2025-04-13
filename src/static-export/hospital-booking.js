
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
  const hospitalMap = document.getElementById('hospitalMap');
  const hospitalList = document.getElementById('hospitalList');
  const mapMarkers = document.querySelectorAll('.map-marker');
  const listItems = document.querySelectorAll('.hospital-list-item');
  const useMyLocationBtn = document.getElementById('useMyLocation');
  const hospitalSearch = document.getElementById('hospitalSearch');
  const specialtyFilter = document.getElementById('specialtyFilter');
  const distanceFilter = document.getElementById('distanceFilter');
  const zoomInBtn = document.querySelector('.zoom-in');
  const zoomOutBtn = document.querySelector('.zoom-out');
  const hospitalActionButtons = document.querySelectorAll('.hospital-action-button');
  const bookButton = document.querySelector('.book-button');
  
  // Variables
  let currentView = 'map';
  let selectedHospitalId = '1'; // Default selected hospital
  let mapZoomLevel = 1;
  
  // Initialize
  function init() {
    // Update current time for "Last updated"
    const updatedTimeElement = document.querySelector('.updated-time');
    if (updatedTimeElement) {
      updatedTimeElement.textContent = 'Just now';
    }
    
    // Set default selected hospital
    updateSelectedHospital(selectedHospitalId);
  }
  
  // Toggle between map and list view
  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      
      // Update toggle buttons
      viewToggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Update view
      if (view === 'map') {
        hospitalMap.style.display = 'block';
        hospitalList.style.display = 'none';
        currentView = 'map';
      } else {
        hospitalMap.style.display = 'none';
        hospitalList.style.display = 'block';
        currentView = 'list';
      }
    });
  });
  
  // Map marker click events
  mapMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
      const hospitalId = this.getAttribute('data-hospital-id');
      updateSelectedHospital(hospitalId);
    });
  });
  
  // List item click events
  listItems.forEach(item => {
    item.addEventListener('click', function() {
      const hospitalId = this.getAttribute('data-hospital-id');
      updateSelectedHospital(hospitalId);
    });
  });
  
  // Update selected hospital
  function updateSelectedHospital(hospitalId) {
    // Reset previous selections
    mapMarkers.forEach(marker => marker.classList.remove('active'));
    listItems.forEach(item => item.classList.remove('active'));
    
    // Set new selection
    const selectedMarker = document.querySelector(`.map-marker[data-hospital-id="${hospitalId}"]`);
    const selectedItem = document.querySelector(`.hospital-list-item[data-hospital-id="${hospitalId}"]`);
    
    if (selectedMarker) selectedMarker.classList.add('active');
    if (selectedItem) selectedItem.classList.add('active');
    
    selectedHospitalId = hospitalId;
    
    // Update hospital details section
    updateHospitalDetails(hospitalId);
  }
  
  // Update hospital details based on selected hospital
  function updateHospitalDetails(hospitalId) {
    // In a real app, this would fetch data from an API
    // Here we'll just simulate different hospital data
    
    const hospitals = {
      '1': {
        name: 'City General Hospital',
        type: 'General Hospital',
        distance: '2.1 miles away',
        rating: 4.8,
        emergency: true,
        insurance: true,
        beds: '15/120',
        waitTime: '~30 mins',
        services: ['General Medicine', 'Emergency Care', 'Surgery', 'Radiology', 'Laboratory', 'Pharmacy'],
        address: '123 Medical Center Blvd,<br>Metropolis, CA 90001',
        hours: [
          { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
          { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
          { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
          { day: 'Emergency', hours: '24/7', isEmergency: true }
        ]
      },
      '2': {
        name: 'Heart & Vascular Institute',
        type: 'Cardiology Center',
        distance: '3.5 miles away',
        rating: 4.9,
        emergency: false,
        insurance: true,
        beds: '8/40',
        waitTime: '~15 mins',
        services: ['Cardiology', 'Vascular Surgery', 'Cardiac Rehabilitation', 'ECG', 'Echocardiography'],
        address: '456 Cardiology Way,<br>Metropolis, CA 90002',
        hours: [
          { day: 'Monday - Thursday', hours: '7:00 AM - 7:00 PM' },
          { day: 'Friday', hours: '7:00 AM - 5:00 PM' },
          { day: 'Saturday', hours: '8:00 AM - 12:00 PM' },
          { day: 'Sunday', hours: 'Closed' }
        ]
      },
      '3': {
        name: 'Neuroscience Medical Center',
        type: 'Neurology Center',
        distance: '5.2 miles away',
        rating: 4.7,
        emergency: true,
        insurance: true,
        beds: '12/60',
        waitTime: '~45 mins',
        services: ['Neurology', 'Neurosurgery', 'Neuroimaging', 'Sleep Medicine', 'Pain Management'],
        address: '789 Brain Health Drive,<br>Metropolis, CA 90003',
        hours: [
          { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
          { day: 'Saturday', hours: '9:00 AM - 3:00 PM' },
          { day: 'Sunday', hours: 'Closed' },
          { day: 'Emergency', hours: '24/7', isEmergency: true }
        ]
      },
      '4': {
        name: 'Children\'s Medical Center',
        type: 'Pediatric Hospital',
        distance: '7.8 miles away',
        rating: 4.6,
        emergency: true,
        insurance: true,
        beds: '20/80',
        waitTime: '~20 mins',
        services: ['Pediatrics', 'Neonatology', 'Pediatric Surgery', 'Child Psychology', 'Immunization'],
        address: '321 Children\'s Way,<br>Metropolis, CA 90004',
        hours: [
          { day: 'Monday - Friday', hours: '7:30 AM - 8:30 PM' },
          { day: 'Saturday - Sunday', hours: '8:00 AM - 6:00 PM' },
          { day: 'Emergency', hours: '24/7', isEmergency: true }
        ]
      },
      '5': {
        name: 'Emergency Care Unit',
        type: 'Emergency Center',
        distance: '4.3 miles away',
        rating: 4.5,
        emergency: true,
        insurance: true,
        beds: '30/30',
        waitTime: '~10 mins',
        services: ['Emergency Medicine', 'Trauma Care', 'Critical Care', 'Ambulance Service', 'Urgent Care'],
        address: '911 Emergency Road,<br>Metropolis, CA 90005',
        hours: [
          { day: 'All Days', hours: '24/7', isEmergency: true }
        ]
      }
    };
    
    const hospital = hospitals[hospitalId] || hospitals['1'];
    
    // Update hospital details UI
    document.querySelector('.selected-hospital-name').textContent = hospital.name;
    document.querySelector('.hospital-type').textContent = hospital.type;
    document.querySelector('.hospital-distance').textContent = hospital.distance;
    document.querySelector('.hospital-rating-small').innerHTML = `${hospital.rating} <span class="star-icon-small"></span>`;
    
    document.querySelector('.info-value:nth-of-type(1)').textContent = hospital.emergency ? '24/7 Available' : 'Not Available';
    document.querySelector('.info-value:nth-of-type(1)').className = `info-value ${hospital.emergency ? 'yes' : 'no'}`;
    
    document.querySelector('.info-value:nth-of-type(2)').textContent = hospital.insurance ? 'Accepted' : 'Limited';
    document.querySelector('.info-value:nth-of-type(2)').className = `info-value ${hospital.insurance ? 'yes' : 'no'}`;
    
    document.querySelector('.info-value:nth-of-type(3)').textContent = hospital.beds;
    document.querySelector('.info-value:nth-of-type(4)').textContent = hospital.waitTime;
    
    // Update services
    const servicesContainer = document.querySelector('.services-tags');
    servicesContainer.innerHTML = '';
    hospital.services.forEach(service => {
      const serviceTag = document.createElement('span');
      serviceTag.className = 'service-tag';
      serviceTag.textContent = service;
      servicesContainer.appendChild(serviceTag);
    });
    
    // Update address
    document.querySelector('.hospital-address p').innerHTML = hospital.address;
    
    // Update hours
    const hoursContainer = document.querySelector('.opening-hours');
    hoursContainer.innerHTML = '';
    hospital.hours.forEach(hour => {
      const hourRow = document.createElement('div');
      hourRow.className = `hour-row${hour.isEmergency ? ' emergency' : ''}`;
      hourRow.innerHTML = `
        <div class="day">${hour.day}</div>
        <div class="hours">${hour.hours}</div>
      `;
      hoursContainer.appendChild(hourRow);
    });
  }
  
  // Use my location button
  useMyLocationBtn.addEventListener('click', function() {
    // In a real app, this would use the Geolocation API
    alert('Using your location to find nearby hospitals');
  });
  
  // Search functionality
  hospitalSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    // In a real app, this would filter results from an API
    // For this example, we'll just show a message
    if (searchTerm.length > 0) {
      console.log('Searching for:', searchTerm);
    }
  });
  
  // Filter functionality
  specialtyFilter.addEventListener('change', function() {
    const specialty = this.value;
    console.log('Filtering by specialty:', specialty || 'All');
    
    // In a real app, this would filter markers and list items
  });
  
  distanceFilter.addEventListener('change', function() {
    const distance = this.value;
    console.log('Filtering by distance:', distance, 'miles');
    
    // In a real app, this would filter markers and list items
  });
  
  // Map zoom controls
  zoomInBtn.addEventListener('click', function() {
    if (mapZoomLevel < 3) {
      mapZoomLevel++;
      updateMapZoom();
    }
  });
  
  zoomOutBtn.addEventListener('click', function() {
    if (mapZoomLevel > 0.5) {
      mapZoomLevel--;
      updateMapZoom();
    }
  });
  
  function updateMapZoom() {
    // In a real app, this would zoom the actual map
    console.log('Map zoom level:', mapZoomLevel);
    
    // Visual feedback
    const mapPlaceholder = document.querySelector('.map-placeholder');
    mapPlaceholder.style.backgroundSize = `${150 * mapZoomLevel}px`;
  }
  
  // Hospital action buttons
  hospitalActionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.classList.contains('call') ? 'call' : 
                    this.classList.contains('directions') ? 'directions' : 'website';
      
      switch (action) {
        case 'call':
          alert('Calling hospital...');
          break;
        case 'directions':
          alert('Opening directions...');
          break;
        case 'website':
          alert('Opening hospital website...');
          break;
      }
    });
  });
  
  // Book button
  bookButton.addEventListener('click', function() {
    alert('Redirecting to appointment booking for ' + document.querySelector('.selected-hospital-name').textContent);
    // In a real app, this would redirect to appointment booking
    window.location.href = "./appointment-booking.html";
  });
  
  // Initialize the application
  init();
});
