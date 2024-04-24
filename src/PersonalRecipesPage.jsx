import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function PersonalRecipesPage() {
	const [personal, setPersonal] = useState([]);

	useEffect(() => {
		const loadPersonal = async () => {
			const url = "https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%202";
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
				setPersonal(data.records);
			} catch (error) {
				console.error(error);
			}
		};
		loadPersonal();
	}, []);

	const showPersonal = personal?.map((item) => {
		return (
			<div key={item.fields.recordID} className='favourites'>
				<Link to={`/personal/${item.fields.recordID}`}>
					<h2>{item.fields.title}</h2>
				</Link>
			</div>
		);
	});

	return (
		<>
			<h1>Your Creations</h1>
			<Link to='/new'>
				<button>Add New Recipe</button>
			</Link>
			<div className='favourites_container'>{showPersonal}</div>
		</>
	);
}
