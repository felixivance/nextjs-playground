import React from "react";
import { TodoApp } from "@/components/todo-app/todo-app";
type Props = {};

export const metadata = {
  title: "Felix Playground - Todo App",
  description: "Todo sample application, with edit, create, update",
};

const TodoAppDemo = async (props: Props) => {
  return (
    <div className="max-w-[600px] mx-auto my-6 py-6 px-4">
      <p>Welcome to todo app</p>
      <TodoApp />
    </div>
  );
};

export default TodoAppDemo;
