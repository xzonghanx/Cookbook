import { useState } from "react";
import { Link } from "react-router-dom";

// const API_KEY_airtable = import.meta.env.VITE_airtable;
const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function HomePage({ searchResults, setSearchResults }) {
	const [search, setSearch] = useState("");
	// const [searchResults, setSearchResults] = useState([]); //* lifted to App.jsx to pass to RecipePage
	// check if i need to replace spaces with %20 charcode. setSearch(search.replace(/\s+/g, "%20")) ?????

	const handleChange = (e) => {
		setSearch(e.target.value);
		console.log(e.target.value);
	};

	const handleSearch = () => async (e) => {
		e.preventDefault();
		const url = `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=10&ranking=2&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${API_KEY_spoon}`;
		console.log("url", url);
		const options = {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(data.results);
			setSearchResults(data.results);
		} catch (error) {
			console.error(error);
		}
	};

	const handleRandom = () => async (e) => {
		e.preventDefault();
		const url = `https://api.spoonacular.com/recipes/random?number=8&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${API_KEY_spoon}`;
		console.log("url", url);
		const options = {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(data.recipes);
			setSearchResults(data.recipes);
		} catch (error) {
			console.error(error);
		}
	};

	const displaySearch = searchResults?.map((searchResult) => {
		return (
			<div className='results' key={searchResult.id}>
				<Link to={`/recipe/${searchResult.id}`}>
					Title: {searchResult?.title}
					<button>Add to Fav</button>
					<img src={searchResult?.image} />
				</Link>
			</div>
		);
	});

	return (
		<>
			<h1>Homepage here</h1>
			<h2>Whats for Dinner?</h2>

			<form>
				<label>
					What are you craving? <input type='text' value={search} onChange={handleChange}></input>
				</label>
				<button onClick={handleSearch()}>Feed Me!</button>
				<button onClick={handleRandom()}>Get Inspired</button>
			</form>
			<div className='search_container'>{displaySearch}</div>
		</>
	);
}
