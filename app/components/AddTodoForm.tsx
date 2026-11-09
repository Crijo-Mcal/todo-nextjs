"use client";

import {useActionState} from "react";
import {addTodo} from "../action";
import type {DataToDO} from "../action";

const initialSate: DataToDO = {message: "", success: false};

export default function AddTodoForm() {
  const [state, formAction, pending] = useActionState(addTodo, initialSate);

  return (
    <div className="w-fit rounded-md bg-amber-300 p-3">
      <form action={formAction} className="flex flex-col gap-2 text-black">
        <input
          type="text"
          name="title"
          placeholder="Masukkan title..."
          required
          className="rounded border border-gray-400 bg-white px-3 py-2 outline-none"
        />

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>

        {!state.success ? (
          <p className="text-sm text-red-600">{state.message}</p>
        ) : (
          <p className="text-sm text-green-600">{state.message}</p>
        )}
      </form>
    </div>
  );
}
