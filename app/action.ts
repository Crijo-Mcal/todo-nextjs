"use server"
import { refresh } from "next/cache";
import pool from "@/lib/db";

export type DataToDO = {
    message: string;
    success: boolean
}

export async function addTodo(prevState: DataToDO, formData: FormData): Promise<DataToDO> {

    const title = formData.get('title');

    if (typeof title !== "string" || title.trim() === "") {
        return { message: 'require input', success: false }
    }


    await pool.execute('INSERT INTO `todos`(`title`) VALUES (?)', [title.trim()])
    refresh();
    return { message: 'success', success: true }

}


export async function updateTodo(formData: FormData): Promise<void> {

    const id = formData.get('id');
    const done = formData.get('done');

    const todoId = Number(id);
    if (!Number.isInteger(todoId) || todoId <= 0 || done !== "1" && done !== "0") {
        return;
    }

    await pool.execute("UPDATE `todos` SET `done`= ? WHERE `id`=?", [done === "1" ? "0" : "1", todoId])
    refresh();
}


export async function deleteTodo(formData: FormData): Promise<void> {

    const id = formData.get('id');

    const todoId = Number(id);
    if (!Number.isInteger(todoId) || todoId <= 0) {
        return;
    }

    await pool.execute("DELETE FROM `todos` WHERE `id`=?", [todoId])
    refresh();
}


