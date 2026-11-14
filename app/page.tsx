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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Todo List</h1>
        <AddTodoForm />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex">
              <ToggleTodoDone todo={todo} />
              <ToggleTodoDelete todo={todo} />
              <Link href={`/${todo.id}`}>{todo.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
