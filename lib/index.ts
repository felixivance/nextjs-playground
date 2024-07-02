type Recipe = {
    title: string
    description: string
    ingredients: string[]
    image: string,
    activeState?: boolean
}

interface Todo {
    id: number
    title: string
    description: string
    done: boolean
  }

export  type {Recipe, Todo}