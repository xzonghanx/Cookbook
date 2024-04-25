import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Notes from "./Notes";
import Loading from "./Loading";

const API_KEY_airtable = import.meta.env.VITE_airtable;
const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function RecipePage({ searchResults, fromRandom }) {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [instructions, setInstructions] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [notesData, setNotesData] = useState({});
	const [favourited, setFavourited] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				fromRandom ? await loadRecipeFromState() : await loadRecipeFromAPI(); //save API call if from random (already has ingredients and instructions included
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const loadRecipeFromState = async () => {
		console.log("loadRecipeFromState");
		setRecipe(...searchResults.filter((result) => result.id === parseInt(recipeId)));
	};

	const loadRecipeFromAPI = async () => {
		console.log("loadRecipeFromAPI");
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
			setInstructions(recipe?.analyzedInstructions[0].steps);
			setIngredients(recipe?.extendedIngredients);
		} catch (error) {
			console.error(error);
		}
	}, [recipe]);

	//To enable innerHTML elements within .summary
	const description = recipe?.summary;
	function ConvertSummary({ description }) {
		return <div dangerouslySetInnerHTML={{ __html: description }} />;
	}

	const mapInstructions = instructions?.map((instruction) => {
		return <li key={instruction.number}> {instruction.step}</li>;
	});

	const mapIngredients = ingredients?.map((ingredient) => {
		return <li key={ingredient.id}> {ingredient.original}</li>;
	});

	useEffect(() => {
		let active = true;
		const checkFavourites = async () => {
			const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201";
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${API_KEY_airtable}`,
				},
			};
			if (active) {
				try {
					const response = await fetch(url, options);
					const data = await response.json();
					const thisRecord = data.records.filter((record) => record.fields.id === parseInt(recipeId));
					setFavourited(thisRecord.length > 0);
					setNotesData(thisRecord.length > 0 ? thisRecord[0].fields : {});
				} catch (error) {
					console.error(error);
				}
			}
		};
		checkFavourites();
		return () => {
			active = false;
		};
	}, [favourited, recipeId]);

	//CREATE AIRTABLE.
	const addFavourite = async () => {
		const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201";
		const data = {
			fields: {
				id: recipe.id,
				title: recipe.title,
				summary: recipe.summary,
				image: recipe.image,
				count: 0,
				lastCooked: null,
				notes: "",
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
		setFavourited(true);
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
		setFavourited(false);
	};

	return (
		<>
			<h1>Recipe Details</h1>
			{loading ? (
				<Loading />
			) : (
				<div className='recipe_page'>
					<h1>Dish Name: {recipe.title}</h1>
					<img src={recipe.image} />
					<ul>
						<li>Servings: {recipe.servings}</li>
						<li>Ready in Minutes: {recipe.readyInMinutes}</li>
					</ul>
					<h2>Recipe Summary:</h2> <ConvertSummary description={description} />
					<br />
					<h2>Ingredients:</h2>
					<ul> {mapIngredients}</ul>
					<h2>Instructions:</h2>
					<ol> {mapInstructions}</ol>
					<div>{favourited ? <button onClick={removeFavourite}>Remove from Favourites</button> : <button onClick={addFavourite}>Add to Favourites</button>}</div>
					<div className='notes_container'>{favourited ? <Notes notesData={notesData} setNotesData={setNotesData} /> : null}</div>
				</div>
			)}
		</>
	);
}
