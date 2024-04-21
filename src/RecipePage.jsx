import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';

const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function RecipePage ({searchResults}) {

	
	const {recipeId} = useParams();
	const [recipe, setRecipe] = useState({});
	
	//* setup ternary so that if pressed from homepage search, immediately load from state (with summary and instructions avail), and minimise API call.
	//TODO i need to push the search data into DB in order to allow the page to still have data upon reload.
	//TODO instead of state, do a fetch api call using the ID. then dont need to pass state.
	//TODO but setup params based on whether the fetch should be from airTable(if from favourites) or from Spoon (new);
	//need to cater to new search (not stored yet) and from favourites (already stored) as well.
	
	useEffect(()=>{
	searchResults.length > 0 ? loadRecipeFromState() : loadRecipeFromDB();
	},[])

	const loadRecipeFromState = () => {
		console.log('loadRecipeFromState');
		setRecipe(...searchResults.filter((result) => result.id === parseInt(recipeId)));
	}

	//this api only fetches the summary, need another for analyzedInstructions.
	const loadRecipeFromDB = async () => {
		console.log('loadRecipeFromDB');
		const url = `https://api.spoonacular.com/recipes/${recipeId}/summary?apiKey=${API_KEY_spoon}`;
		const options = {
			method: 'GET', 
			headers: {"Content-Type": "application/json"}
		};
		try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);
		setRecipe(data);
		} catch (error) {
		console.error(error);
		}
	}

	//To enable innerHTML elements within .summary
	const description = recipe?.summary;
	function ConvertRecipe({description}){
		return (
			<div dangerouslySetInnerHTML={{ __html: description}} />
		)
	}

	return (
		<div className="recipe_page">
			<h1>Recipe page here</h1>
			<h1>recipeID from params: {recipeId}</h1>
			<h2>setRecipeState from props: {recipe?.title}</h2>
			<ConvertRecipe description={description}/>
			
			<br/>
			<div> TO DO THIS AFTER
			<button>Get Similar Recipes</button>
			</div>
		</div>
	)

}