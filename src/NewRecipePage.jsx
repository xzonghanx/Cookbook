// import { useState } from "react";
// const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function NewRecipePage() {
	// const [newRecipe, setNewRecipe] = useState({});

	return <h1>New Recipe page here</h1>;
}

//CREATE AIRTABLE.
// const addRecipe = async () => {
// 	const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201";
// 	const data = {
// 		fields: {
// 			id: recipe.id,
// 			title: recipe.title,
// 			summary: recipe.summary,
// 			image: recipe.image,
// 			count: count,
//			lastCooked: date,
//			notes: notes
// 		},
// 	};
// 	const options = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${API_KEY_airtable}`,
// 		},
// 		body: JSON.stringify(data),
// 	};
// 	const response = await fetch(url, options);
// 	const res = response.json();
// 	console.log(res);
// };
