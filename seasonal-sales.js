// console.log("seasonal-sales.js loaded");

// **** Get the JSON Data and put into arrays *****


// Get Data from products JSON, and call function to load categories:

var productsReq = new XMLHttpRequest();

productsReq.addEventListener("load", productsLoadComplete)
productsReq.open("GET", "products.json", true);
productsReq.send();
var products = [];

function productsLoadComplete (event) {
	// console.log("productsReq.statusText: ", productsReq.statusText);
	products = JSON.parse(productsReq.responseText);
	// console.log("products", products);
	getCatData();
}




// Function that gets Data from Categories after products are loaded, then does everything else needed:

var categories = [];
function getCatData(){
var categoriesReq = new XMLHttpRequest();

categoriesReq.addEventListener("load", categoriesLoadComplete)
categoriesReq.open("GET", "categories.json", true);
categoriesReq.send();
};

function categoriesLoadComplete (event) {
	// console.log("categoriesReq.statusText: ", event.target.statusText);
	categories = JSON.parse(event.target.responseText);
	// console.log("categories", categories);
	theRest();
}





// Initialize season to summer upon load
var currentSeason = "Summer";


function theRest(){
	// Update display upon page load
	updateDisplay();

// Listen for selected season 
	var seasonSelect = document.getElementById("sel1");
	

		seasonSelect.addEventListener("change", () => {
			// console.log("event", event.target.value));
			currentSeason = event.target.value;
			console.log("currentSeason", currentSeason);
			updateDisplay();
		});



	};


	


	

function updateDisplay () {
	var cardOutput = document.getElementById("card-container");
	cardOutput.innerHTML = "";
	

	// console.log("products.products.length", products.products.length);

	for (let i = 0; i < products.products.length; i++){
		let currentCatId = products.products[i].category_id;
		let currentProdCatName = getCatName(currentCatId);
		let currentProdSeasonName = getCatSeason(currentCatId);
		let currentProdDiscount = getCatDiscount(currentCatId);
		let basePrice = products.products[i].price;
		let finalPrice = basePrice;
		let isDiscounted;

		if(currentSeason === currentProdSeasonName) {
			finalPrice = (basePrice - (basePrice * currentProdDiscount)).toFixed(2); // discount with rounding to 2 places
			isDiscounted = true;
		} else {
			isDiscounted = false;
		}


		

	cardOutput.innerHTML += `<div class= "card" id="card${products.products[i].id}">
							<h4 class="card-name">${products.products[i].name}</h4>
							<p class="card-price">Price: $${finalPrice}</p>
							<p>Department: ${currentProdCatName}</p>
							<p class="discounted">ON SALE!</p>
					</div>`;

	};
};
// ************** Leaving off here: Exercise is complete. Now trying to have each product show that it's "on sale"
//  Added an id to each dynamically generated card, and have logic above for "isDiscounted".
//  Now need to get all those elements and toggle "discounted" class based on that.
// 
// 



// Get category name from catID
function getCatName(catId){
	console.log("categories.categories.length", categories.categories.length, "catId", catId)
	for(let i = 0; i < categories.categories.length; i++) {
		if (catId == categories.categories[i].id) {
			return categories.categories[i].name;
		};
	};
}

// Get category season from catID
function getCatSeason(catId){
	for(let i = 0; i < categories.categories.length; i++) {
		if (catId == categories.categories[i].id) {
			return categories.categories[i].season_discount
		};
	};
}

// Get category discount from catID
function getCatDiscount(catId){
	for(let i = 0; i < categories.categories.length; i++) {
		if (catId == categories.categories[i].id) {
			return categories.categories[i].discount
		};
	};
}





