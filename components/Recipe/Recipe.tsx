import { Recipe } from "@/lib";
import Image from "next/image";
import React from "react";

const RecipeComponent = ({
  title,
  description,
  image,
  ingredients,
  activeState,
}: Recipe) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center uppercase font-bold">{title}</h2>
        <span className="border w-40 bg-red-400 h-1 m-2"></span>
        <p className="text-center">{description}</p>
        {/* src={image} */}
        <Image
          src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          alt={title}
          width={300}
          height={300}
          className="rounded-md justify-center items-center"
        />
        {activeState &&
          ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </div>
    </div>
  );
};

export default RecipeComponent;
