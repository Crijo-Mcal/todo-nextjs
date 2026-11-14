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
    <form action={formAction}>
      <input type="text" name="title" defaultValue={params.title} />
      <input type="hidden" name="id" defaultValue={params.id} />
      <button type="submit" disabled={pendiong}>
        simpan
      </button>
      <p>{state.message}</p>
    </form>
  );
}
