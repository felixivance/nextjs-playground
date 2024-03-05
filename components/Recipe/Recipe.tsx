import { Recipe } from '@/lib'
import Image from 'next/image'
import React from 'react'



const RecipeComponent = ({title, description, image, ingredients, activeState}: Recipe) => {
  return (
    <div className='flex flex-col gap-3'>
       <div className='flex flex-col justify-center items-center'>
        <h2 className='text-center uppercase font-bold'>{title}</h2>
        <span className='border w-40 bg-red-400 h-1 m-2'></span>
            <p className='text-center'>{description}</p>
            <Image src={image} alt={title} width={300} height={300} className='rounded-md justify-center items-center' />
            {
                activeState &&
                ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))
            }
            
       </div>
    </div>
  )
}

export default RecipeComponent