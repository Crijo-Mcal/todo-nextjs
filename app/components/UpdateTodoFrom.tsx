"use client";

import {useActionState} from "react";
import {updateTodo} from "../action";
import {DataToDO} from "../action";

const initialState: DataToDO = {message: "", success: false};

type UpdateTodoFromProp = {
  id: number;
  title: string;
};

export default function UpdateTodoFrom(params: UpdateTodoFromProp) {
  const [state, formAction, pendiong] = useActionState(
    updateTodo,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        defaultValue={params.title}
        className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-cyan-500"
      />
      <input type="hidden" name="id" defaultValue={params.id} />
      <button
        type="submit"
        disabled={pendiong}
        className="rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 disabled:opacity-50"
      >
        {pendiong ? "Menyimpan..." : "Simpan"}
      </button>
      <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
        {state.message}
      </p>
    </form>
  );
}
