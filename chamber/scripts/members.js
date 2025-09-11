const url = 'data/members.json';

const cards = document.getElementById('member-cards');

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    cards.innerHTML = ''; // Clear existing content
    members.forEach(member => {

        const wrapper = document.createElement('div');
        wrapper.className = `member-wrapper`;

        // Create a card for each member
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let logo = document.createElement('img');
        // let address = document.createElement('p');
        // let phone = document.createElement('p');
        // let website = document.createElement('a');
        let description = document.createElement('h3');
        let contact = document.createElement('p');

        // Set the content for each element

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '80');
        logo.setAttribute('height', '80');

        name.textContent = `${member.name}`;
        description.textContent = `${member.description}`;
        // address.textContent = `Address: ${member.address}`;
        // phone.textContent = `Phone: ${member.phone}`;

        // // website.setAttribute('href', member.website);
        // // website.setAttribute('target', '_blank');
        // website.textContent = `URL: ${member.website}`;
        contact.innerHTML = `<strong>Email:</strong> ${member.contact_email}<br>
                                <strong>Phone:</strong> ${member.phone}<br>
                                <strong>URL:</strong> ${member.website}`;



        // Appeand Card
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(logo);
        // card.appendChild(address);
        // card.appendChild(phone);
        // card.appendChild(website);
        card.appendChild(contact);

        wrapper.appendChild(card);
        cards.appendChild(wrapper);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const gridBtn = document.getElementById('grid');
    const listBtn = document.getElementById('list');
    const memberCards = document.getElementById('member-cards');

    // Default to grid view
    memberCards.classList.add('grid');

    gridBtn.addEventListener('click', () => {
        memberCards.classList.add('grid');
        memberCards.classList.remove('list');
    });

    listBtn.addEventListener('click', () => {
        memberCards.classList.add('list');
        memberCards.classList.remove('grid');
    });
});

getMembersData();