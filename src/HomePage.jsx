import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import SearchResultsDisplay from "./SearchResultsDisplay";

const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function HomePage({ searchResults, setSearchResults, setFromRandom }) {
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState({ cuisine: "", maxReadyTime: "" });
	const [loading, setLoading] = useState(false);

	// const navigate = useNavigate();

	const handleChange = (e) => {
		setSearch(e.target.value);
	};
	const handleFilters = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSearch = () => async (e) => {
		e.preventDefault();
		setLoading(true);
		// const searchQuery = `?query=${search.replace(/\s+/g, "%20")}${filters.cuisine ? `&cuisine=${filters.cuisine}` : ""}${filters.maxReadyTime ? `&maxReadyTime=${filters.maxReadyTime}` : ""}`;
		const url = `https://api.spoonacular.com/recipes/complexSearch?query=${search.replace(/\s+/g, "%20")}${filters.cuisine ? `&cuisine=${filters.cuisine}` : ""}${filters.maxReadyTime ? `&maxReadyTime=${filters.maxReadyTime}` : ""}&number=9&ranking=2&apiKey=${API_KEY_spoon}`;
		const options = {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(data.results);
			setSearchResults(data.results);
			// navigate(`/search/${searchQuery}`, { replace: true });
		} catch (error) {
			console.error(error);
		}
		setFromRandom(false);
		setLoading(false);
	};

	const handleRandom = () => async (e) => {
		e.preventDefault();
		setLoading(true);
		// const searchQuery = `?query=random`;
		const url = `https://api.spoonacular.com/recipes/random?number=9&apiKey=${API_KEY_spoon}`;
		const options = {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(data.recipes);
			setSearchResults(data.recipes);
			// navigate(`/search/${searchQuery}`, { replace: true });
		} catch (error) {
			console.error(error);
		}
		setFromRandom(true);
		setLoading(false);
	};

	return (
		<>
			<h1>Whats for Dinner?</h1>
			{loading ? (
				<Loading />
			) : (
				<>
					<form className='searchbox'>
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
							<span>
								{" "}
								<input name='maxReadyTime' type='number' placeholder='Max Prep Time' value={filters.maxReadyTime} onChange={handleFilters}></input>
							</span>
						</div>
					</form>
					<SearchResultsDisplay searchResults={searchResults} />
				</>
			)}
		</>
	);
}
