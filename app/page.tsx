import type {RowDataPacket} from "mysql2";
import Link from "next/link";
import AddTodoForm from "./components/AddTodoForm";
import pool from "@/lib/db";
import ToggleTodoDone from "./components/ToggleTodoDone";
import ToggleTodoDelete from "./components/ToggleTodoDelete";

interface Todo extends RowDataPacket {
  id: number;
  title: string;
  done: number;
}

export default async function Home() {
  const [todos] = await pool.query<Todo[]>("SELECT * FROM todos");

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <AddTodoForm />
      <ul className="mt-6 divide-y divide-zinc-200">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 py-2">
            <ToggleTodoDone todo={todo} />
            <Link
              href={`/${todo.id}`}
              className={`flex-1 hover:underline ${todo.done ? "line-through" : ""}`}
            >
              {todo.title}
            </Link>
            <ToggleTodoDelete todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
}
