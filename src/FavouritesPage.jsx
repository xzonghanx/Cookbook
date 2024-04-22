import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function FavouritesPage() {
	const [favourites, setFavourites] = useState([]);

	useEffect(() => {
		const loadFavourites = async () => {
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
				console.log(data.records);
				setFavourites(data.records);
			} catch (error) {
				console.error(error);
			}
		};
		loadFavourites();
	}, []);

	const showFavourites = favourites?.map((favourite) => {
		return (
			<div key={favourite.fields.id} className='favourites'>
				<Link to={`/recipe/${favourite.fields.id}`}>
					Title: {favourite.fields.title}
					<img src={favourite.fields.image} />
				</Link>
				<p>
					<span>Times Cooked: Count</span>
					<span>Last Cooked: Date</span>
				</p>
			</div>
		);
	});

	return (
		<>
			<h1>Your Favourite Recipes</h1>
			<div className='favourites_container'>{showFavourites}</div>
		</>
	);
}
