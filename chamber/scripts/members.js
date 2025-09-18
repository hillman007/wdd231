const url = 'https://hillman007.github.io/wdd231/chamber/data/members.json';

const cards = document.getElementById('member-cards');

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    cards.innerHTML = '';
    members.forEach(member => {
        const wrapper = document.createElement('div');
        wrapper.className = 'member-wrapper';

        const card = document.createElement('section');
        const name = document.createElement('h2');
        const logo = document.createElement('img');
        const description = document.createElement('h3');
        const contact = document.createElement('p');

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '80');
        logo.setAttribute('height', '80');

        name.textContent = member.name;
        description.textContent = member.description;
        contact.innerHTML = `<strong>Email:</strong> ${member.contact_email}<br>
                             <strong>Phone:</strong> ${member.phone}<br>
                             <strong>URL:</strong> ${member.website}`;

        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(logo);
        card.appendChild(contact);

        wrapper.appendChild(card);
        cards.appendChild(wrapper);
    });
}

async function loadSpotlights() {
    const spotlightContainer = document.getElementById('spotlight-cards');
    if (!spotlightContainer) return;

    const response = await fetch(url);
    const data = await response.json();

    // Filter for gold (3) and silver (2) members
    const eligible = data.filter(m => m.membership_level === 2 || m.membership_level === 3);

    // Shuffle and pick 2 or 3
    const count = Math.floor(Math.random() * 2) + 2;
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const spotlights = shuffled.slice(0, count);

    spotlightContainer.innerHTML = '';

    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.className = `spotlight-card ${member.membership_level === 3 ? 'gold' : 'silver'}`;

        card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" width="80" height="80">
            <h3>${member.name}</h3>
            <p><strong>Membership:</strong> ${member.membership_level === 3 ? 'Gold' : 'Silver'}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        spotlightContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const gridBtn = document.getElementById('grid');
    const listBtn = document.getElementById('list');
    const memberCards = document.getElementById('member-cards');

    if (gridBtn && listBtn && memberCards) {
        memberCards.classList.add('grid');

        gridBtn.addEventListener('click', () => {
            memberCards.classList.add('grid');
            memberCards.classList.remove('list');
        });

        listBtn.addEventListener('click', () => {
            memberCards.classList.add('list');
            memberCards.classList.remove('grid');
        });

        getMembersData();
    }

    loadSpotlights();
});