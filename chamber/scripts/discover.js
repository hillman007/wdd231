const url = 'https://hillman007.github.io/wdd231/chamber/data/discover.json';

const grid = document.getElementById('discoverGrid');
const visitorInfo = document.getElementById('visitorInfo');

async function loadDiscoverItems() {
    const response = await fetch(url);
    const places = await response.json();
    displayItems(places);
}

function displayItems(places) {
    grid.innerHTML = '';
    places.forEach(place => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.innerHTML = `
            <figure>
                <img src="${place.image}" alt="${place.name}" width="300" height="200">
            </figure>
            <div class="discover-info">
                <h2>${place.name}</h2>
                <address class="discover-address">${place.address}</address>
                <p class="discover-desc">${place.description}</p>
                <button class="learn-more" type="button">Learn more</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Visitor message logic
function showVisitorMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';
    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const diffMs = now - parseInt(lastVisit, 10);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffMs < 1000 * 60 * 60 * 24) {
            message = 'Back so soon! Awesome!';
        } else if (diffDays === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }
    visitorInfo.textContent = message;
    localStorage.setItem('lastVisit', now);
}

showVisitorMessage();
loadDiscoverItems();