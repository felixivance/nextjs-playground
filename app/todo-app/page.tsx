import React from "react";
import connectMongoDB from "../../lib/mongo-connect";
import Todo from "../../models/todoModel";
import Link from "next/link";

type Props = {};

export const metadata = {
  title: "Felix Playground - Todo App",
  description: "Todo sample application, with edit, create, update",
};

const TodoApp = async (props: Props) => {
  const data = await getTodos();
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Todo App</h1>
        <span className="">
          <Link href={"add-todo"}> Add TOdo</Link>
        </span>
        {data && data.length > 0 ? (
          // <div>
          //     {
          //         data.map((todo)=>{
          //             <p key={todo._id}>{todo.description}</p>
          //         })
          //     }
          // </div>
          <div>todo</div>
        ) : (
          "<p>No todos</p>"
        )}
      </div>
    </div>
  );
};

export default TodoApp;

async function getTodos() {
  try {
    connectMongoDB();
    const todos = await Todo.find({});
    if (!todos) {
      throw new Error("Could not fetch todos");
    }
    return todos;
  } catch (error) {
    console.log("error while fetching todos");
  }
}
