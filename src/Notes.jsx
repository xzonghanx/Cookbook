import { useState } from "react";
const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function Notes({ notesData, setNotesData }) {
	const [inputs, setInputs] = useState(notesData);
	const [toggleForm, setToggleForm] = useState(false);
	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
		console.log(e.target.value);
	};

	const handleToggle = () => {
		toggleForm ? setToggleForm(false) : setToggleForm(true);
	};

	const displayForm = () => {
		return (
			<form className='notes_form' onSubmit={handlePatch}>
				<fieldset>
					<label>
						Notes: <input className='notes_input' name='notes' type='text' value={inputs?.notes} onChange={handleChange} />
					</label>
					<label>
						Times Cooked: <input name='count' type='number' value={inputs?.count} onChange={handleChange} />
					</label>
					<label>
						Last Cooked: <input name='lastCooked' type='date' value={inputs?.date} onChange={handleChange} />
					</label>
					<button>Save</button>
				</fieldset>
			</form>
		);
	};

	// UPDATE AIRTABLE.
	const handlePatch = async (e) => {
		e.preventDefault();
		const url = `https://api.airtable.com/v0/appvwwJA2TsFZC1Fi/Table%201/${notesData.recordID}`;
		const data = {
			fields: {
				count: parseInt(inputs.count),
				lastCooked: inputs.lastCooked,
				notes: inputs.notes,
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
		//!AIRTABLE only takes in ISO format yyyy/mm/dd
		// console.log("date", inputs.lastCooked);
		// console.log("data ", JSON.stringify(data));
		const response = await fetch(url, options);
		const res = response.json();
		console.log(res);
		handleToggle();
		//TODO testing this to activate useEffect upstream
		setNotesData({ ...notesData, ...inputs });
	};

	return (
		<>
			<h1>Notes</h1>
			<p>Notes: {notesData.notes}</p>
			<p>Times Cooked: {notesData.count ? notesData.count : "not tried"}</p>
			<p>Last Cooked:{notesData.lastCooked ? new Date(notesData.lastCooked).toLocaleDateString("en-SG") : "not tried"}</p>
			<button onClick={handleToggle}>Add/Edit Notes</button>
			{toggleForm ? displayForm() : null}
		</>
	);
}
