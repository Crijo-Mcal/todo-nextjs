import {deleteTodo} from "../action";

type ToggleTodoDeleteProp = {
  todo: {
    id: number;
  };
};

export default function ToggleTodoDelete({todo}: ToggleTodoDeleteProp) {
  return (
    <>
      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />

        <button className="cursor-pointer" type="submit">
          ❌
        </button>
      </form>
    </>
  );
}
