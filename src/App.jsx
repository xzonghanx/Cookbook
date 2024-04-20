import {useState, useEffect} from 'react'
import './App.css'

const API_KEY_airtable = import.meta.env.VITE_airtable;
const API_KEY_spoon = import.meta.env.VITE_spoon;

function App() {
  
  const [airTable, setAirTable] = useState([]);
  const [spoon, setSpoon] = useState({});
  
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
  useEffect (() => {
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
loadSpoon();
}, [])
//change this to only load on click to reduce API calls.

return (
  <>
    <h1>hello</h1>
    <div>map out all Airtable IDs {showAirTable}</div>
    <div>Spoonresults title {spoon.title}</div>
  </>
  )
}

export default App
