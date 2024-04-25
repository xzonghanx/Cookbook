import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function FavouritesPage() {
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadFavourites = async () => {
			setLoading(true);
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
				setFavourites(data.records);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		loadFavourites();
	}, []);

	const showFavourites = favourites?.map((favourite) => {
		return (
			<div key={favourite.fields.id} className='favourites'>
				<Link to={`/recipe/${favourite.fields.id}`}>
					<h3>{favourite.fields.title}</h3>
					<img className='imageDemo' src={favourite.fields.image} />
				</Link>
				<div>Times Cooked:{favourite.fields.count ? favourite.fields.count : "Never"}</div>
				<div>Last Cooked:{favourite.fields.lastCooked ? new Date(favourite.fields.lastCooked).toLocaleDateString("en-SG") : "Never"} </div>
			</div>
		);
	});

	const sortCount = () => {
		let sorted = [...favourites];
		sorted.sort((a, b) => b.fields.count - a.fields.count);
		setFavourites(sorted);
	};

	const sortDate = () => {
		let filteredWithDates = favourites.filter((item) => item.fields.lastCooked !== undefined);
		let filteredWithoutDates = favourites.filter((item) => item.fields.lastCooked === undefined);
		filteredWithDates.sort((a, b) => new Date(b.fields.lastCooked) - new Date(a.fields.lastCooked));
		setFavourites([...filteredWithDates, ...filteredWithoutDates]);
	};

	return (
		<>
			<h1>Your Favourite Recipes</h1>
			{loading ? (
				<Loading />
			) : (
				<>
					<div>
						<button onClick={sortDate}>Sort by Date</button>
						<button onClick={sortCount}>Sort by Times Cooked</button>
					</div>
					<div className='favourites_container'>{favourites.length > 0 ? showFavourites : "No favourited recipes yet"}</div>
				</>
			)}
		</>
	);
}
