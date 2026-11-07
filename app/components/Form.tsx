export default function Form() {
  return (
    <form
      action="#"
      className="w-auto w-10 flex gap-2 bg-amber-300 p-2 rounded-sm"
    >
      <input className="border-2 border-black" type="text" name="title" />
      <button type="submit" className="px-3 py-1 text-black  bg-cyan-200">
        simpan
      </button>
    </form>
  );
}
