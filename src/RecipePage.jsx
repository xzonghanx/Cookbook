import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';

export default function RecipePage () {

	const {recipeId} = useParams();
	console.log (recipeId);
	const [recipe, setRecipe] = useState({});

	//should i fetch data from db or take from state???!?!?!?!
	//ternary to check if state exists? else take from db?
	//need to cater to new search (not stored yet) and from favourites (already stored) as well.

	return (
		<>
			<h1>Recipe page here</h1>
			<h1>testing recipeID from params: {recipeId}</h1>
		</>
	)

}