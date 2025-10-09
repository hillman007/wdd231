const grid = document.querySelector('.favorites-grid');
const modal = document.getElementById('favorites-modal');
const closeBtn = document.getElementById('close-favorites-modal');
const modalName = document.getElementById('modal-dessert-name');
const modalInstructions = document.getElementById('modal-dessert-instructions');

async function getRandomDesserts(count = 6) {
    // Fetch all desserts from TheMealDB
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
    const data = await res.json();
    const allDesserts = data.meals;
    // Pick random unique desserts
    const selected = [];
    const usedIndexes = new Set();
    while (selected.length < count && usedIndexes.size < allDesserts.length) {
        const idx = Math.floor(Math.random() * allDesserts.length);
        if (!usedIndexes.has(idx)) {
            usedIndexes.add(idx);
            selected.push(allDesserts[idx]);
        }
    }
    // Fetch full details for each selected dessert
    const details = await Promise.all(selected.map(async (d) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${d.idMeal}`);
        const data = await res.json();
        const meal = data.meals[0];
        return {
            name: meal.strMeal,
            img: meal.strMealThumb,
            instructions: meal.strInstructions
        };
    }));
    return details;
}

function renderCards(desserts) {
    grid.innerHTML = '';
    desserts.forEach((d, i) => {
        const card = document.createElement('div');
        card.className = 'card favorite-card';
        card.setAttribute('data-index', i);
        card.setAttribute('tabindex', '0');

        const img = document.createElement('img');
        img.src = d.img;
        img.alt = d.name;
        img.loading = 'lazy';

        const h3 = document.createElement('h3');
        h3.textContent = d.name;

        card.appendChild(img);
        card.appendChild(h3);
        grid.appendChild(card);
    });
}

let dessertsData = [];

getRandomDesserts().then((desserts) => {
    dessertsData = desserts;
    renderCards(dessertsData);
});

grid.addEventListener('click', (e) => {
    const card = e.target.closest('.favorite-card');
    if (!card) return;
    const idx = card.getAttribute('data-index');
    const dessert = dessertsData[idx];
    modalName.textContent = dessert.name;
    modalInstructions.textContent = dessert.instructions;
    modal.classList.add('show');
    // Save last viewed favorite to localStorage
    localStorage.setItem('lastFavorite', JSON.stringify(dessert));
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});
