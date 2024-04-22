import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY_airtable = import.meta.env.VITE_airtable;
const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function RecipePage({ searchResults }) {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [instructions, setInstructions] = useState([]);
	const [ingredients, setIngredients] = useState([]);

	//* need to cater to new search (not stored yet) and from favourites (already stored) as well.
	//* setup ternary so that if pressed from Homepage search, immediately load from state (with summary and instructions avail), and minimise API call.
	//TODO setup params based on whether the fetch should be from airTable(if from favourites) or from Spoon (new); i already setup to fetch from spoon if it is not in state (i.e. refreshed)
	//TODO currently cannot figure out how to store the recipe/instructions in airtable as obj, just obtain id as param and fetch data

	useEffect(() => {
		searchResults.length > 0 ? loadRecipeFromState() : loadRecipeFromDB();
		console.log("recipe", recipe);
	}, []);

	const loadRecipeFromState = async () => {
		console.log("loadRecipeFromState");
		setRecipe(...searchResults.filter((result) => result.id === parseInt(recipeId)));
	};

	const loadRecipeFromDB = async () => {
		console.log("loadRecipeFromDB");
		const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY_spoon}`;
		const options = {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			setRecipe(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		try {
			console.log("analyzedinstructions", recipe?.analyzedInstructions[0].steps);
			setInstructions(recipe?.analyzedInstructions[0].steps);
			console.log("extendedingredients", recipe?.extendedIngredients);
			setIngredients(recipe?.extendedIngredients);
		} catch (error) {
			console.error(error);
		}
	}, [recipe]);

	//To enable innerHTML elements within .summary
	const description = recipe?.summary;
	function ConvertRecipe({ description }) {
		return <div dangerouslySetInnerHTML={{ __html: description }} />;
	}

	const mapInstructions = instructions?.map((instruction) => {
		return <li key={instruction.number}> {instruction.step}</li>;
	});

	const mapIngredients = ingredients?.map((ingredient) => {
		return <li key={ingredient.id}> {ingredient.original}</li>;
	});
	// const mapIngredients = ingredients?.length > 0 ? ingredients.map((ingredient) => <li key={ingredient.id}>{ingredient.original}</li>) : <li>Not available</li>;

	//*POST INTO AIRTABLE.
	//TODO figure out how to post nested objects and arrays too.
	//TODO otherwise have to post ingredients & instructions as strings to make them editable later.
	//TODO use ternary operator to check if it already exists in favourites. (check if id exists)
	const addFavourite = async () => {
		const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201";
		const data = {
			fields: {
				id: recipe.id,
				title: recipe.title,
				summary: recipe.summary,
				image: recipe.image,
			},
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY_airtable}`,
			},
			body: JSON.stringify(data),
		};
		console.log(JSON.stringify(data));
		const response = await fetch(url, options);
		const res = response.json();
		console.log(res);
		console.log("ADDED");
	};

	return (
		<div className='recipe_page'>
			<h1>Dish Name: {recipe.title}</h1>
			<img src={recipe.image} />
			<ul>
				<li>Servings: {recipe.servings}</li>
				<li>Ready in Minutes: {recipe.readyInMinutes}</li>
			</ul>
			<h2>Recipe Summary:</h2> <ConvertRecipe description={description} />
			<br />
			<h2>Ingredients:</h2>
			<ul> {mapIngredients}</ul>
			<h2>Instructions:</h2>
			<ol> {mapInstructions}</ol>
			<div>
				<button onClick={addFavourite}>Add to Fav</button>
				<button>TODO Get Similar Recipes (Link back to previous page display)</button>
			</div>
		</div>
	);
}
