import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import RoundTo from 'round-to';


import './App.css';

const App = () => {

  const APP_ID = '2d0c4ebe';
  const APP_KEY = '42c4f519e52bad0e3e0e0784a8f3a5de	';


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  let loading = false;
  let recipesCount;
  useEffect(() => {
    getRecipes();
  }, [query]);



  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    loading = true;
    setRecipes(data.hits)
    let recipesCount = data.length;
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const roundToCalories = (calories) => {
    return RoundTo(calories, 0)
  };

  const getRecipesCount = () => {

    if (loading) {

      return <div><h2>recipes + "recipes found"</h2></div>;
    }
  }


  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">

      <h1>Type an ingredient to get a recipe with</h1>

      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type='text' value={search} onChange={updateSearch} />

        <button className="search-button" type='submit'>Search</button>
      </form>


      <div className="recipes">
        <div style={{ display: "inline" }}>
          <h2>  {recipes.length} recipes found</h2>
        </div>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={roundToCalories(recipe.recipe.calories)}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;



