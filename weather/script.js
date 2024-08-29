// script.js
document.getElementById('searchBtn').addEventListener('click', function() {
    const recipeQuery = document.getElementById('recipeInput').value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeQuery}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json();
        })
        .then(data => {
            const recipesList = document.getElementById('recipesList');
            recipesList.innerHTML = ''; // Clear previous results

            if (data.meals === null) {
                recipesList.innerHTML = `<p>No recipes found</p>`;
            } else {
                data.meals.forEach(recipe => {
                    const recipeElement = document.createElement('div');
                    recipeElement.classList.add('recipe');
                    recipeElement.innerHTML = `
                        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                        <h3>${recipe.strMeal}</h3>
                        <p><strong>Category:</strong> ${recipe.strCategory}</p>
                        <p><strong>Area:</strong> ${recipe.strArea}</p>
                    `;
                    recipesList.appendChild(recipeElement);
                });
            }
        })
        .catch(error => {
            alert(error.message);
        });
});
