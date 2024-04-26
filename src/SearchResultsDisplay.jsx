import { Link } from "react-router-dom";

export default function SearchResultsDisplay({ searchResults }) {
	const displaySearch = searchResults?.map((searchResult) => {
		return (
			<div className='results' key={searchResult.id}>
				<Link to={`/recipe/${searchResult.id}`}>
					<div>{searchResult?.title}</div>
					<img className='imageDemo' src={searchResult?.image} />
				</Link>
			</div>
		);
	});

	return (
		<>
			<div className='search_container'>{searchResults.length > 0 ? displaySearch : <h3>WE CANT FIND ANYTHING IF YOU ARE BEING SO PICKY"</h3>}</div>
		</>
	);
}
