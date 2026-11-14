import pool from "@/lib/db";
import type {RowDataPacket} from "mysql2";
import UpdateTodoFrom from "../components/UpdateTodoFrom";
import {notFound} from "next/navigation";

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
      <UpdateTodoFrom id={todo.id} title={todo.title} />
    </>
  );
}
