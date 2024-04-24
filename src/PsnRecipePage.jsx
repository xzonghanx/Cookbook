import { useParams } from "react-router";
import { useState, useEffect } from "react";

const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function PsnRecipesPage() {
	const { recordID } = useParams();
	const [thisRecipe, setThisRecipe] = useState({});
	const [toggleForm, setToggleForm] = useState(false);

	const handleChange = (e) => {
		setThisRecipe({ ...thisRecipe, [e.target.name]: e.target.value });
		console.log(e.target.value);
	};

	const handleToggle = () => {
		toggleForm ? setToggleForm(false) : setToggleForm(true);
	};

	useEffect(() => {
		const loadThisRecipe = async () => {
			const url = `https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%202/${recordID}`;
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
				console.log(data.fields);
				setThisRecipe(data.fields);
			} catch (error) {
				console.error(error);
			}
		};
		loadThisRecipe();
	}, []);

	const displayForm = () => {
		return (
			<form className='new_form' onSubmit={EditRecipe}>
				<fieldset>
					<label>
						Title: <input name='title' type='text' value={thisRecipe.title} onChange={handleChange} />
					</label>
					<label>
						Summary: <textarea className='notes_input' name='summary' value={thisRecipe.summary} onChange={handleChange} />
					</label>
					<label>
						Ingredients: <textarea className='notes_input' name='ingredients' value={thisRecipe.ingredients} onChange={handleChange} />
					</label>
					<label>
						Instructions: <textarea className='notes_input' name='instructions' value={thisRecipe.instructions} onChange={handleChange} />
					</label>
					<label>
						Notes: <textarea className='notes_input' name='notes' value={thisRecipe.notes} onChange={handleChange} />
					</label>
					<button>Save</button>
				</fieldset>
			</form>
		);
	};

	// UPDATE AIRTABLE.
	const EditRecipe = async (e) => {
		e.preventDefault();
		const url = `https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%202/${recordID}`;
		const data = {
			fields: {
				title: thisRecipe.title,
				summary: thisRecipe.summary,
				notes: thisRecipe.notes,
				ingredients: thisRecipe.ingredients,
				instructions: thisRecipe.instructions,
			},
		};
		const options = {
			method: "PATCH",
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
		handleToggle();
	};

	return (
		<>
			<div className='recipe_page'>
				<h1>Dish Name: {thisRecipe.title}</h1>
				<button onClick={handleToggle}> EDIT Recipe</button>
				{toggleForm ? displayForm() : null}
				<h2>Recipe Summary: </h2>
				<div>{thisRecipe.summary}</div>
				<br />
				<h2>Ingredients:</h2>
				<ul>
					{thisRecipe.ingredients?.split("\n").map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
				<h2>Instructions:</h2>
				<ol>
					{thisRecipe.instructions?.split("\n").map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ol>
				<h2>Notes:</h2>
				<ul>
					{thisRecipe.notes?.split("\n").map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
				<br />
			</div>
		</>
	);
}
