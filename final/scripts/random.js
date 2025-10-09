// Handles fetching a random dessert recipe from TheMealDB API and displaying it

// Modal logic for random dessert
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-random-modal');
    const modal = document.getElementById('random-modal');
    const closeBtn = document.getElementById('close-random-modal');
    const resultDiv = document.getElementById('modal-recipe-result');

    async function fetchRandomDessert() {
        if (!resultDiv) return;
        resultDiv.innerHTML = '<p>Loading...</p>';
        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
            const data = await res.json();
            const recipes = data.meals;
            const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
            // Fetch full recipe details
            const detailsRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomRecipe.idMeal}`);
            const detailsData = await detailsRes.json();
            const recipe = detailsData.meals[0];
            resultDiv.innerHTML = '';
            const h3 = document.createElement('h3');
            h3.textContent = recipe.strMeal;
            const img = document.createElement('img');
            img.src = recipe.strMealThumb;
            img.alt = recipe.strMeal;
            img.loading = 'lazy';
            const instructions = document.createElement('p');
            instructions.innerHTML = `<strong>Instructions:</strong> ${recipe.strInstructions}`;
            resultDiv.appendChild(h3);
            resultDiv.appendChild(img);
            resultDiv.appendChild(instructions);
        } catch (err) {
            resultDiv.innerHTML = '<p>Could not fetch recipe. Please try again.</p>';
        }
    }

    if (openBtn && modal && closeBtn && resultDiv) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('show');
            fetchRandomDessert();
        });
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});
