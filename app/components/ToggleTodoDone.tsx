import {updateTodoDone} from "../action";

type ToggleTodoDoneProp = {
  todo: {
    id: number;
    done: number;
  };
};

export default function ToggleTodoDone({todo}: ToggleTodoDoneProp) {
  return (
    <>
      <form action={updateTodoDone}>
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="done" value={todo.done} />

        <button type="submit" className="cursor-pointer">
          {todo.done ? "✅" : "⬜"}
        </button>
      </form>{" "}
    </>
  );
}
