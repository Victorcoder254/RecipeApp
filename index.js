const SearchText = document.getElementById("SearchBox");
const SearchButton = document.getElementById("SearchButton");

const ApiKey = "hM3bgfw29EapeHXd/B/9QA==i2HJGit5ru0pZnxy";


let recipes = {};

SearchButton.addEventListener("click", function() {
     let searchRecipe = SearchText.value.trim();

     if (searchRecipe.length === 0) {
          return;
     }
     else {
         GetRecipeViaApi(searchRecipe);
         SearchText.value = "";
     }   
});


async function GetRecipeViaApi(query) {
      try {
                // Create a headers object with the required X-Api-Key header
            const options = {
                 headers : {
                  'X-Api-Key' : 'hM3bgfw29EapeHXd/B/9QA==i2HJGit5ru0pZnxy'
                 }
            };

            let response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${query}`, options);
            let data = await response.json(); 
            
            UpdateDOM(data);

      }
      catch (err) {
            console.error(`Error : ${err}`);
      }     
}

async function UpdateDOM(data) {
      try {
          let returnedData = await data; // Assuming data is a JSON array
          console.log(returnedData);
  
          // Get the container where the recipe cards will be added
          let recipeContainer = document.getElementById("recipe-container");
  
          // Clear the container content for new search results
          recipeContainer.innerHTML = "";
  
          // Loop through the data and create recipe cards
          for (let i = 0; i < returnedData.length; i++) {
              const { title, ingredients, servings, instructions } = returnedData[i];
  
              // Ensure ingredients is an array
              let ingredientList = Array.isArray(ingredients)
                  ? ingredients
                  : ingredients.split(",").map(item => item.trim());
  
              let recipeCard = document.createElement("div");
              recipeCard.className = "col-md-4 col-sm-6 mb-4";
  
              recipeCard.innerHTML = `
                  <div class="card border-0 shadow-sm h-100">
                      <div class="card-body">
                          <!-- Title -->
                          <h5 class="card-title text-primary mb-3">${title}</h5>
                          
                          <!-- Servings -->
                          <p class="card-text">
                              <strong>Servings:</strong> ${servings}
                          </p>
                          
                          <!-- Ingredients -->
                          <p class="card-text mb-4">
                              <strong>Ingredients:</strong>
                              <ul class="list-unstyled mt-2 ps-3">
                                  ${ingredientList.map(ingredient => `<li>• ${ingredient}</li>`).join("")}
                              </ul>
                          </p>
                          
                          <!-- Collapsible Instructions -->
                          <div class="collapse" id="instructions-${i}">
                              <p class="card-text"><strong>Instructions:</strong> ${instructions}</p>
                          </div>
                          
                          <!-- Toggle Button -->
                          <a class="btn btn-outline-primary mt-3" data-bs-toggle="collapse" href="#instructions-${i}" role="button" aria-expanded="false" aria-controls="instructions-${i}">
                              Show More
                          </a>
                      </div>
                  </div>
              `;
  
              // Append the card to the container
              recipeContainer.appendChild(recipeCard);
          }
      } catch (err) {
          console.error("Error updating DOM:", err);
      }
  }
  