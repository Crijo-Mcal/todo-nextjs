import pool from "@/lib/db";
import type {RowDataPacket} from "mysql2";
import UpdateTodoFrom from "../components/UpdateTodoFrom";
import {notFound} from "next/navigation";
import Link from "next/link";

interface Todo extends RowDataPacket {
  id: number;
  title: string;
}

export default async function TodoUpdate({params}: PageProps<"/[id]">) {
  const {id} = await params;

  const todoId = Number(id);
  if (!Number.isInteger(todoId) || todoId <= 0) {
    notFound();
  }

  const [row] = await pool.query<Todo[]>("SELECT * FROM todos WHERE id =?", [
    todoId,
  ]);

  const todo = row[0];

  if (!todo) {
    notFound();
  }

  return (
    <>
      <Link href="/" className="text-sm text-cyan-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-bold">Edit Todo</h1>
      <UpdateTodoFrom id={todo.id} title={todo.title} />
    </>
  );
}
