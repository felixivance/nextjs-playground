"use client";

import RecipeComponent from "@/components/Recipe/Recipe";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/lib";
import { RecipesList } from "@/lib/data";
import React, { useState } from "react";

const RecipePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [recipeList, setRecipeList] = useState<Recipe[]>(RecipesList);

  const [newRecipeModal, setNewRecipeModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [activeRecipe, setActiveRecipe] = useState<number>(-1);

  const search = () => {
    const filteredRecipes = RecipesList.filter((recipe: Recipe) =>
      [recipe.title, recipe.description, ...recipe.ingredients].some((text) => {
        return text.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setRecipeList(filteredRecipes);

    if (searchTerm === "") {
      setRecipeList(RecipesList);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      search();
    }
  };

  const addNewRecipe = () => {
    if (!title || !description || !image || !ingredients) {
      setNewRecipeModal(false);
      return;
    }

    const newRecipe = {
      title,
      description,
      image,
      ingredients: ingredients.split(","),
    };
    setRecipeList([...recipeList, newRecipe]);
    setNewRecipeModal(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between p-24 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recipe App</CardTitle>

          <CardDescription>Click on an item to view the recipe</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="search..."
            className="p-2 border-2 border-r-0 border-gray-300 h-10 rounded-md w-96 rounded-r-none"
            onKeyDown={onKeyDown}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-slate-200 text-black p-2 rounded-l-none rounded-md h-10"
            onClick={search}
          >
            search
          </button>
        </div>
        <div>
          <button
            onClick={() => setNewRecipeModal(!newRecipeModal)}
            className="bg-blue-200 text-black p-2 rounded-md"
          >
            Add New{" "}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipeList.map((recipe, index) => (
          <div
            className="cursor-pointer"
            onClick={() =>
              activeRecipe === index
                ? setActiveRecipe(-1)
                : setActiveRecipe(index)
            }
            key={index}
          >
            <RecipeComponent
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              ingredients={recipe.ingredients}
              activeState={activeRecipe == index}
            />
          </div>
        ))}
      </div>

      {/* modal */}
      {newRecipeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-center">Add New Recipe</h2>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                className="p-2 border-2 border-gray-300 rounded-md"
              />

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                className="p-2 border-2 border-gray-300 rounded-md"
              />

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="image url"
                className="p-2 border-2 border-gray-300 rounded-md"
              />

              <input
                type="text"
                value={ingredients}
                placeholder="ingredients"
                onChange={(e) => setIngredients(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addNewRecipe}
                className="bg-blue-200 text-black p-2 rounded-md"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
