// Load discover cards from JSON
async function loadDiscoverItems() {
    try {
      const response = await fetch('data/discover.json');
      const items = await response.json();
      const container = document.querySelector('.card-grid');
  
      items.forEach(item => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure><img src="${item.image}" alt="${item.name}" width="300" height="200"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Failed to load items:", error);
    }
  }
  
  loadDiscoverItems();
  
  // Visit message using localStorage
  const msgBox = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  
  if (!lastVisit) {
    msgBox.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      msgBox.textContent = "Back so soon! Awesome!";
    } else {
      msgBox.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
    }
  }
  
  localStorage.setItem('lastVisit', now);
  