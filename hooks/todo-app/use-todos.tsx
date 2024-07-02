import { create } from "zustand";
import { Todo } from "@/lib/index";

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}
export const useTodos = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
}));
