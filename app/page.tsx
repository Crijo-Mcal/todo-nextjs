import type {RowDataPacket} from "mysql2";
import Form from "./components/Form";
import pool from "@/lib/db";

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
        <Form />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.done ? "✅" : "⬜"} {todo.title}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
