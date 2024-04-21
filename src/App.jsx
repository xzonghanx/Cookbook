import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import { createContext } from 'react'
export const DataContext = createContext();
import HomePage from './HomePage';
import RecipePage from './RecipePage';
import FavouritesPage from './FavouritesPage';
import NewRecipePage from './NewRecipePage';
import EditPage from './EditPage';



function App() {
  
return (
  <>
  
  <nav>
    <Link to="/">
      <h1>Home Page</h1>
    </Link>
    <Link to="/favourites">
      <h1>Favourites</h1>
    </Link>
  </nav>
  <br/>
  
  <main>
  <DataContext.Provider value = {'put in the results here'}> 
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:recipeId" element={<RecipePage/>} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/new" element={<NewRecipePage />} />
      <Route path="/recipe/edit/:recipeId" element={<EditPage />} />
    </Routes>   
  </DataContext.Provider>
  </main>
  

  </>
  )
}

export default App
