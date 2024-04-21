import './App.css'
import { useState } from "react";
import {Routes, Route, Link} from 'react-router-dom'
import HomePage from './HomePage';
import RecipePage from './RecipePage';
import FavouritesPage from './FavouritesPage';
import NewRecipePage from './NewRecipePage';
import EditPage from './EditPage';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  

return (
  <>
  <nav>
    <Link to="/">
      <h1>Home Page</h1>
    </Link>
    <h1>COOK BOOK</h1>
    <Link to="/favourites">
      <h1>Favourites</h1>
    </Link>
  </nav>
  <br/>
  
  <main>
    <Routes>
      <Route path="/" element={<HomePage searchResults={searchResults} setSearchResults={setSearchResults} />} />
      <Route path="/recipe/:recipeId" element={<RecipePage searchResults={searchResults}/>} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/new" element={<NewRecipePage />} />
      <Route path="/recipe/edit/:recipeId" element={<EditPage />} />
    </Routes>   
  </main>
  

  </>
  )
}

export default App
