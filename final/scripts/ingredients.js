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
            resultDiv.innerHTML = matches.map(r => `
                <div class="card">
                    <h3>${r.name}</h3>
                    <p><strong>Ingredients:</strong> ${r.ingredients.join(', ')}</p>
                    <p><strong>Instructions:</strong> ${r.instructions}</p>
                </div>
            `).join('');
        }
    } catch (err) {
        resultDiv.innerHTML = '<p>Error loading recipes.</p>';
    }
});
