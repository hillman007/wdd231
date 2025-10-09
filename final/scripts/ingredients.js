// Handles ingredient-based recipe search from a local JSON file

document.getElementById('ingredient-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('ingredients').value.trim().toLowerCase();
    const resultDiv = document.getElementById('ingredient-results');
    resultDiv.innerHTML = '<p>Searching...</p>';
    const userIngredients = input.split(',').map(i => i.trim()).filter(i => i);
    try {
        const res = await fetch('recipes.json');
        const recipes = await res.json();
        const matches = recipes.filter(recipe =>
            userIngredients.every(userIng =>
                recipe.ingredients.map(i => i.toLowerCase()).includes(userIng)
            )
        );
        if (matches.length === 0) {
            resultDiv.innerHTML = '<p>No matching recipes found.</p>';
        } else {
            resultDiv.innerHTML = '';
            matches.forEach(r => {
                const card = document.createElement('div');
                card.className = 'card';
                const h3 = document.createElement('h3');
                h3.textContent = r.name;
                const img = document.createElement('img');
                img.src = r.image;
                img.alt = r.name;
                img.loading = 'lazy';
                const ingredients = document.createElement('p');
                ingredients.innerHTML = `<strong>Ingredients:</strong> ${r.ingredients.join(', ')}`;
                const instructions = document.createElement('p');
                instructions.innerHTML = `<strong>Instructions:</strong> ${r.instructions}`;
                card.appendChild(h3);
                card.appendChild(img);
                card.appendChild(ingredients);
                card.appendChild(instructions);
                resultDiv.appendChild(card);
            });
        }
    } catch (err) {
        resultDiv.innerHTML = '<p>Error loading recipes.</p>';
    }
});
