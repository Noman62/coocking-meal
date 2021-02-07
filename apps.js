document.getElementById('searchBtn').addEventListener("click", function () {

    const mealList = document.getElementById('mealList');
    let getInputText = document.getElementById('getInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${getInputText}`)
        .then(res => res.json())
        .then(data => {

            data.meals.forEach(meal => {

                const div = document.createElement('div');
                div.className = 'meal-item';
                const mealInfo = `
                <div onclick="displayDetails('${meal.idMeal}')"<div>
                    <img src="${meal.strMealThumb}" alt="food">
                    <h3>${meal.strMeal}<h3>
                </div>
                `;

                div.innerHTML = mealInfo;
                mealList.appendChild(div);


            });


        })
        .catch(err => notFound(err))
    document.getElementById('getInput').value = "";
})

//print error message
const notFound = err => {
    alert("Sorry, we didn't find any meal!");
}

//get recipe of the meal
const displayDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => detailsPerMeal(data.meals[0]));
}

// create a modal
const detailsPerMeal = item => {
    const instructionDiv = document.getElementById('IngredientOfMeal');
    instructionDiv.innerHTML = `
    <img src="${item.strMealThumb}" alt="food">
    <h3>${item.strMeal}<h3>
    <h3>Ingredients</h3>
     
    <li>${item.strIngredient1}</li>
         
    <li>${item.strIngredient2}</li>
         
    <li>${item.strIngredient3}</li>
         
    <li>${item.strIngredient4}</li>
         
    <li>${item.strIngredient5}</li>
         
    <li>${item.strIngredient6}</li>
         
    <li>${item.strIngredient7}</li>
     `;
}