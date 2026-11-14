"use client";

import {useActionState} from "react";
import {addTodo} from "../action";
import type {DataToDO} from "../action";

const initialSate: DataToDO = {message: "", success: false};

export default function AddTodoForm() {
  const [state, formAction, pending] = useActionState(addTodo, initialSate);

  return (
    <div>
      <form action={formAction} className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Masukkan title..."
          required
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </form>

      {!state.success ? (
        <p className="mt-2 text-sm text-red-600">{state.message}</p>
      ) : (
        <p className="mt-2 text-sm text-green-600">{state.message}</p>
      )}
    </div>
  );
}
