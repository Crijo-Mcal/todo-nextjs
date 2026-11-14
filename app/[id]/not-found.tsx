import Link from "next/link";

export default function notFound() {
  return (
    <div className="py-8 text-center">
      <h1 className="mb-4 text-xl font-bold">Todo tidak ditemukan</h1>
      <Link href="/" className="text-cyan-600 hover:underline">
        ← Kembali ke daftar
      </Link>
    </div>
  );
}
