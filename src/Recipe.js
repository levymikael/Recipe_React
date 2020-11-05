import React from 'react';
import style from './recipe.module.css'

const Recipe = ({ title, calories, image, ingredients }) => {

    return (
        <div className={style.recipe}>
            <h1>{title}</h1>

            <h3 id="ingredients_title">Ingredients:</h3>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <div > <h3>Calories: </h3>
                <p>{calories}</p> </div>
            <img className={style.image} src={image}></img>

        </div>
    );
}


export default Recipe;