import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function HomePage({ searchResults, setSearchResults, setFromRandom }) {
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState({ cuisine: "", maxReadyTime: "" });
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setSearch(e.target.value);
		console.log(e.target.value);
	};
	const handleFilters = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSearch = () => async (e) => {
		e.preventDefault();
		setLoading(true);
		const url = `https://api.spoonacular.com/recipes/complexSearch?query=${search.replace(/\s+/g, "%20")}${filters.cuisine ? `&cuisine=${filters.cuisine}` : ""}${filters.maxReadyTime ? `&maxReadyTime=${filters.maxReadyTime}` : ""}&number=10&ranking=2&apiKey=${API_KEY_spoon}`;
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
		setFromRandom(false);
		setLoading(false);
	};

	const handleRandom = () => async (e) => {
		e.preventDefault();
		setLoading(true);
		const url = `https://api.spoonacular.com/recipes/random?number=8&apiKey=${API_KEY_spoon}`;
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
		setFromRandom(true);
		setLoading(false);
	};

	const displaySearch = searchResults?.map((searchResult) => {
		return (
			<div className='results' key={searchResult.id}>
				<Link to={`/recipe/${searchResult.id}`}>
					Title: {searchResult?.title}
					<img src={searchResult?.image} />
				</Link>
			</div>
		);
	});

	return (
		<>
			<h1>Whats for Dinner?</h1>
			{loading ? (
				<Loading />
			) : (
				<>
					<form>
						<label>
							What are you craving? <input type='search' value={search} onChange={handleChange}></input>
						</label>
						<button onClick={handleSearch()}>Feed Me!</button>
						<button onClick={handleRandom()}>Get Inspired</button>
						<div>
							Filters:
							<select name='cuisine' onChange={handleFilters}>
								<option value=''> Select Cuisine </option>
								<option value='chinese'> Chinese </option>
								<option value='french'> French </option>
								<option value='italian'> Italian </option>
								<option value='japanese'> Japanese </option>
								<option value='korean'> Korean </option>
								<option value='spanish'> Spanish </option>
								<option value='thai'> Thai </option>
							</select>
							<input name='maxReadyTime' type='number' placeholder='Max Prep Time' value={filters.maxReadyTime} onChange={handleFilters}></input>
						</div>
					</form>
					<div className='search_container'>{searchResults.length > 0 ? displaySearch : "WE CANT FIND ANYTHING IF YOU ARE BEING SO PICKY"}</div>
				</>
			)}
		</>
	);
}
