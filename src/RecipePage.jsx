import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Notes from "./Notes";

const API_KEY_airtable = import.meta.env.VITE_airtable;
const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function RecipePage({ searchResults }) {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [instructions, setInstructions] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [notesData, setNotesData] = useState({});
	const [favourited, setFavourited] = useState(null);

	useEffect(() => {
		searchResults.length > 0 ? loadRecipeFromState() : loadRecipeFromAPI();
		// console.log("recipe", recipe);
	}, []);

	const loadRecipeFromState = async () => {
		// console.log("loadRecipeFromState");
		setRecipe(...searchResults.filter((result) => result.id === parseInt(recipeId)));
	};

	const loadRecipeFromAPI = async () => {
		// console.log("loadRecipeFromAPI");
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
			// console.log("analyzedinstructions", recipe?.analyzedInstructions[0].steps);
			setInstructions(recipe?.analyzedInstructions[0].steps);
			// console.log("extendedingredients", recipe?.extendedIngredients);
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

	//TODO use ternary operator to check if it already exists in favourites. (check if id exists),
	//TODO if exist, then change button to <Remove from Fav>; and load <Notes />
	//TODO else just Add to Fav button --> and onClick --> load <Notes />

	useEffect(() => {
		const checkFavourites = async () => {
			const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201";
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${API_KEY_airtable}`,
				},
			};
			try {
				const response = await fetch(url, options);
				const data = await response.json();
				const thisRecord = data.records.filter((record) => record.fields.id === parseInt(recipeId));
				// console.log(thisRecord);
				// console.log(thisRecord.length);
				thisRecord.length > 0 ? setFavourited(true) : setFavourited(false);
				setNotesData(thisRecord[0].fields);
			} catch (error) {
				console.error(error);
			}
		};
		checkFavourites();
	}, []);

	//CREATE AIRTABLE.
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
		const response = await fetch(url, options);
		const res = response.json();
		console.log(res);
	};

	//DELETE AIRTABLE. i need Airtable's generated recordID to access just that single record
	const removeFavourite = async () => {
		const url = `https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201/${notesData.recordID}`;
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY_airtable}`,
			},
		};
		const response = await fetch(url, options);
		const res = response.json();
		console.log(res);
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
			<div>{favourited ? <button onClick={removeFavourite}>Remove from Favourites</button> : <button onClick={addFavourite}>Add to Favourites</button>}</div>
			<button>TODO Get Similar Recipes (Link back to previous page display)</button>
			<div className='notes_container'>
				<Notes notesData={notesData} />
			</div>
		</div>
	);
}
