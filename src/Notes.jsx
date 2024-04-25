import { useState } from "react";
const API_KEY_airtable = import.meta.env.VITE_airtable;

export default function Notes({ notesData, setNotesData }) {
	const [inputs, setInputs] = useState(notesData);
	const [toggleForm, setToggleForm] = useState(false);
	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleToggle = () => {
		toggleForm ? setToggleForm(false) : setToggleForm(true);
	};

	const displayForm = () => {
		return (
			<form className='notes_form' onSubmit={handlePatch}>
				<fieldset>
					<label>
						Notes: <textarea className='notes_input' name='notes' value={inputs?.notes} onChange={handleChange} />
					</label>
					<label>
						Times Cooked: <input name='count' type='number' min='0' value={inputs?.count} onChange={handleChange} />
					</label>
					<label>
						Last Cooked: <input name='lastCooked' type='date' max={new Date().toISOString().split("T")[0]} value={inputs?.date} onChange={handleChange} />
					</label>
					<button>Save</button>
				</fieldset>
			</form>
		);
	};

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
		const response = await fetch(url, options);
		const res = response.json();
		handleToggle();
		setNotesData({ ...notesData, ...inputs });
	};

	return (
		<>
			<p>
				<b>Notes: </b>
				{notesData.notes}
			</p>
			<p>
				<b>Times Cooked: </b>
				{notesData.count ? notesData.count : "not tried"}
			</p>
			<p>
				<b>Last Cooked: </b>
				{notesData.lastCooked ? new Date(notesData.lastCooked).toLocaleDateString("en-SG") : "not tried"}
			</p>
			<button onClick={handleToggle}>Add/Edit Notes</button>
			{toggleForm ? displayForm() : null}
		</>
	);
}
