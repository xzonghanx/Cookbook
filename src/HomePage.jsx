import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const API_KEY_airtable = import.meta.env.VITE_airtable;
const API_KEY_spoon = import.meta.env.VITE_spoon;

export default function HomePage () {

	const [airTable, setAirTable] = useState([]);
	const [spoon, setSpoon] = useState({});
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	//check if i need to replace spaces with %symbols
	
	//TESTING AIRTABLE
	useEffect (() => {
	  const loadAirTable = async () => {
		const url = 'https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201';
		const options = {
		method: 'GET', 
		headers: {
		  "Content-Type": "application/json",
		Authorization: `Bearer ${API_KEY_airtable}`
	  }
	};
	try {
	  const response = await fetch(url, options);
	  const data = await response.json();
	  console.log(data.records);
	  setAirTable(data.records);
	  //note there are 2 different IDs. 1 from airtable(auto). and 1 within the fieldsObject (refering to id from spoon)
	} catch (error) {
	  console.error(error);
	}
  };
  loadAirTable();
  }, [])
  
  const showAirTable = airTable.map((airtab) => {
	return (
	  <div key={airtab.id}>{airtab.fields.id}</div>
	)})
	  
	//TESTING SPOONACULAR
	//figure out how to position the & and ? later on search by types.
	const loadSpoon = async () => {
	  const url = `https://api.spoonacular.com/recipes/643011/summary?apiKey=${API_KEY_spoon}`;
	  const options = {
		method: 'GET', 
		headers: {"Content-Type": "application/json"}
	  };
	  try {
	  const response = await fetch(url, options);
	  const data = await response.json();
	  console.log(data);
	  setSpoon(data);
	  } catch (error) {
	  console.error(error);
	}
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
		console.log(e.target.value)
	}

	const handleSearch = () => async (e) => {
		e.preventDefault();
		const url = `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=10&ranking=2&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${API_KEY_spoon}`;
		console.log('url',url);
		const options = {
			method: 'GET', 
			headers: {"Content-Type": "application/json"}
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
		const url = `https://api.spoonacular.com/recipes/random?number=10&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${API_KEY_spoon}`;
		console.log('url',url);
		const options = {
			method: 'GET', 
			headers: {"Content-Type": "application/json"}
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
			<tr className="results" key={searchResult?.id}>
				<td>
					<Link to={`/recipe/${searchResult.id}`}>
						Title: {searchResult?.title}
						<img src={searchResult?.image}/>
					</Link>
				</td>
				{/* <td>
					Summary: {searchResult.summary}
				</td> */}
			</tr>
		)
	})


	return (
	<>
		<h1>Homepage here</h1>
		<h2>Whats for Dinner?</h2>
		

		<form>
			<label>
			What are you craving? <input type="text" value={search} onChange={handleChange}></input>
			</label>
			<button onClick={handleSearch()}>Feed Me!</button>
			<button onClick={handleRandom()}>Get Inspired</button>
		</form>
		<table className="search_container">{displaySearch}</table>



		{/* <div>map out all Airtable IDs: {showAirTable}</div>
		<div>
		  Spoonresults title: {spoon.title}
		  <button onClick={loadSpoon}>load spoon api</button>
		</div> */}
	</>
	)

}