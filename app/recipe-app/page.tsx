"use client";

import RecipeComponent from "@/components/Recipe/Recipe";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/lib";
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

export const RecipesList = [
  {
    title: "Spaghetti Bolognese",
    image: "https://source.unsplash.com/800x600/?spaghetti",
    ingredients: [
      "ground beef",
      "onion",
      "garlic",
      "tomato sauce",
      "spaghetti",
    ],
    description:
      "Classic Italian dish with savory ground beef in rich tomato sauce served over perfectly cooked spaghetti.",
  },
  {
    title: "Chicken Alfredo Pasta",
    image: "https://source.unsplash.com/800x600/?chicken-pasta",
    ingredients: [
      "chicken breast",
      "fettuccine pasta",
      "heavy cream",
      "parmesan cheese",
    ],
    description:
      "Creamy Alfredo sauce coats tender chicken and fettuccine pasta, creating a comforting and satisfying meal.",
  },
  {
    title: "Vegetarian Stir-Fry",
    image: "https://source.unsplash.com/800x600/?vegetarian-stir-fry",
    ingredients: ["tofu", "broccoli", "carrot", "soy sauce", "ginger"],
    description:
      "A quick and healthy stir-fry featuring tofu and colorful vegetables tossed in a flavorful soy and ginger sauce.",
  },
  {
    title: "Margherita Pizza",
    image: "https://source.unsplash.com/800x600/?pizza",
    ingredients: ["pizza dough", "tomato sauce", "fresh mozzarella", "basil"],
    description:
      "A classic Margherita pizza with a thin crust, tangy tomato sauce, fresh mozzarella, and aromatic basil leaves.",
  },
  {
    title: "Beef Tacos",
    image: "https://source.unsplash.com/800x600/?tacos",
    ingredients: [
      "ground beef",
      "taco shells",
      "lettuce",
      "tomato",
      "cheddar cheese",
    ],
    description:
      "Delicious and easy-to-make beef tacos loaded with seasoned ground beef, fresh veggies, and melted cheddar cheese.",
  },
  {
    title: "Mushroom Risotto",
    image: "https://source.unsplash.com/800x600/?mushroom-risotto",
    ingredients: [
      "arborio rice",
      "mushrooms",
      "onion",
      "vegetable broth",
      "parmesan cheese",
    ],
    description:
      "Creamy and flavorful mushroom risotto made with Arborio rice, sautéed mushrooms, and Parmesan cheese.",
  },
  {
    title: "Chicken Caesar Salad",
    image: "https://source.unsplash.com/800x600/?caesar-salad",
    ingredients: [
      "chicken breast",
      "romaine lettuce",
      "croutons",
      "parmesan cheese",
      "caesar dressing",
    ],
    description:
      "A classic Caesar salad featuring grilled chicken, crisp romaine lettuce, crunchy croutons, and tangy Caesar dressing.",
  },
  {
    title: "Shrimp Scampi",
    image: "https://source.unsplash.com/800x600/?shrimp-scampi",
    ingredients: ["shrimp", "linguine pasta", "garlic", "lemon", "white wine"],
    description:
      "Juicy shrimp cooked in a garlic and lemon-infused white wine sauce, served over a bed of perfectly cooked linguine pasta.",
  },
  {
    title: "Spinach and Feta Stuffed Chicken Breast",
    image: "https://source.unsplash.com/800x600/?stuffed-chicken",
    ingredients: ["chicken breast", "spinach", "feta cheese", "garlic"],
    description:
      "Tender chicken breasts stuffed with a flavorful combination of spinach, feta cheese, and garlic, baked to perfection.",
  },
  {
    title: "Vegetable Curry",
    image: "https://source.unsplash.com/800x600/?vegetable-curry",
    ingredients: ["mixed vegetables", "coconut milk", "curry paste", "rice"],
    description:
      "A hearty and aromatic vegetable curry made with a medley of colorful vegetables, coconut milk, and flavorful curry paste.",
  },
  {
    title: "Caprese Salad",
    image: "https://source.unsplash.com/800x600/?caprese-salad",
    ingredients: ["tomatoes", "fresh mozzarella", "basil", "balsamic glaze"],
    description:
      "A refreshing Caprese salad featuring ripe tomatoes, creamy fresh mozzarella, fragrant basil, and a drizzle of balsamic glaze.",
  },
  {
    title: "Pesto Pasta with Cherry Tomatoes",
    image: "https://source.unsplash.com/800x600/?pesto-pasta",
    ingredients: ["pasta", "pesto sauce", "cherry tomatoes", "parmesan cheese"],
    description:
      "Delicious pasta coated in vibrant pesto sauce, tossed with sweet cherry tomatoes, and finished with Parmesan cheese.",
  },
  {
    title: "Beef and Broccoli Stir-Fry",
    image: "https://source.unsplash.com/800x600/?beef-broccoli",
    ingredients: ["beef strips", "broccoli", "soy sauce", "ginger", "rice"],
    description:
      "Quick and flavorful beef and broccoli stir-fry featuring tender beef strips, crisp broccoli, and a savory soy and ginger sauce.",
  },
  {
    title: "Chicken Enchiladas",
    image: "https://source.unsplash.com/800x600/?chicken-enchiladas",
    ingredients: [
      "shredded chicken",
      "tortillas",
      "enchilada sauce",
      "cheddar cheese",
    ],
    description:
      "Satisfying chicken enchiladas filled with seasoned shredded chicken, rolled in tortillas, and smothered in enchilada sauce and melted cheddar cheese.",
  },
  {
    title: "Lemon Garlic Roast Chicken",
    image: "https://source.unsplash.com/800x600/?roast-chicken",
    ingredients: ["whole chicken", "lemon", "garlic"],
    description:
      "Juicy and flavorful roast chicken infused with the bright and zesty flavors of lemon and garlic, perfect for a comforting family meal.",
  },
  {
    title: "Teriyaki Salmon",
    image: "https://source.unsplash.com/800x600/?teriyaki-salmon",
    ingredients: [
      "salmon fillets",
      "teriyaki sauce",
      "green onions",
      "sesame seeds",
    ],
    description:
      "Delicious teriyaki-glazed salmon fillets topped with green onions and sesame seeds, served over a bed of fluffy rice.",
  },
  {
    title: "Egg Fried Rice",
    image: "https://source.unsplash.com/800x600/?egg-fried-rice",
    ingredients: ["cooked rice", "eggs", "vegetables", "soy sauce"],
    description:
      "A quick and tasty egg fried rice dish with fluffy rice, scrambled eggs, and a medley of colorful vegetables seasoned with soy sauce.",
  },
  {
    title: "Cauliflower Buffalo Wings",
    image: "https://source.unsplash.com/800x600/?buffalo-wings",
    ingredients: ["cauliflower", "buffalo sauce", "dipping sauce"],
    description:
      "Spicy and crispy cauliflower buffalo wings, perfect for a vegetarian twist on the classic buffalo wings, served with a tangy dipping sauce.",
  },
  {
    title: "Homemade Lasagna",
    image: "https://source.unsplash.com/800x600/?lasagna",
    ingredients: [
      "ground beef",
      "lasagna noodles",
      "ricotta cheese",
      "tomato sauce",
    ],
    description:
      "Classic homemade lasagna featuring layers of perfectly cooked lasagna noodles, savory ground beef, creamy ricotta cheese, and flavorful tomato sauce.",
  },
  {
    title: "Pumpkin Soup",
    image: "https://source.unsplash.com/800x600/?pumpkin-soup",
    ingredients: ["pumpkin", "onion", "vegetable broth", "cream"],
    description:
      "Comforting and creamy pumpkin soup made with roasted pumpkin, sautéed onions, vegetable broth, and a touch of cream for richness.",
  },
];
