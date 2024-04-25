import { useState } from "react";
import Loading from "./Loading";
const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function NewRecipePage() {
	const [newRecipe, setNewRecipe] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
		console.log(e.target.value);
	};

	const displayForm = () => {
		return (
			<form className='new_form' onSubmit={addRecipe}>
				<fieldset>
					<label>
						Title: <input name='title' type='text' onChange={handleChange} />
					</label>
					<label>
						Summary: <textarea className='notes_input' name='summary' onChange={handleChange} />
					</label>
					<label>
						Ingredients: <textarea className='notes_input' name='ingredients' onChange={handleChange} />
					</label>
					<label>
						Instructions: <textarea className='notes_input' name='instructions' onChange={handleChange} />
					</label>
					<label>
						Notes: <textarea className='notes_input' name='notes' onChange={handleChange} />
					</label>
					<button>Save</button>
				</fieldset>
			</form>
		);
	};

	// CREATE AIRTABLE.
	const addRecipe = async (e) => {
		e.preventDefault();
		setLoading(true);
		const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%202";
		const data = {
			fields: {
				title: newRecipe.title,
				summary: newRecipe.summary,
				notes: newRecipe.notes,
				ingredients: newRecipe.ingredients,
				instructions: newRecipe.instructions,
				photo: newRecipe.photo,
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
		setNewRecipe({}); //reset fields
		setLoading(false);
	};

	return (
		<>
			<h1>New Recipe Preview:</h1>
			{loading ? (
				<Loading />
			) : (
				<>
					<div>{displayForm()}</div>
					<br />
					<div className='recipe_page'>
						<h1>Dish Name: {newRecipe.title}</h1>
						<h2>Recipe Summary: </h2>
						<div>{newRecipe.summary}</div>
						<br />
						<h2>Ingredients:</h2>
						<ul>
							{newRecipe.ingredients?.split("\n").map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
						<h2>Instructions:</h2>
						<ol>
							{newRecipe.instructions?.split("\n").map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ol>
						<h2>Notes:</h2>
						<ul>
							{newRecipe.notes?.split("\n").map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>
				</>
			)}
		</>
	);
}
