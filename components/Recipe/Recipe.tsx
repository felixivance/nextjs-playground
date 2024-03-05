import { Recipe } from '@/lib'
import Image from 'next/image'
import React from 'react'



const RecipeComponent = ({title, description, image, ingredients}: Recipe) => {
  return (
    <div className='flex flex-col gap-3'>
       <div className=''>
        <h3 className='text-center'>{title}</h3>
            <p>{description}</p>
            <Image src={image} alt={title} width={300} height={300} className='rounded-md' />
            {/* {
                ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))
            } */}
       </div>
    </div>
  )
}

export default RecipeComponent