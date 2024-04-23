// const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function Notes({ notesData }) {
	//TODO post/patch [add/edit notes]
	/* https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201/${notesData.recordID} */

	return (
		<>
			<h1>Notes</h1>
			<p>Notes: {notesData.notes}</p>
			<p>Times Cooked: {notesData.count ? notesData.count : "not tried"}</p>
			<p>Last Cooked:{notesData.lastCooked ? notesData.lastCooked : "not tried"}</p>
			<button>Add / Edit Notes</button>
			{/* later change this container to appear at the side */}
		</>
	);
}
