@AGENTS.md

# Catatan Belajar React & Next.js

Project ini adalah tempat belajar, bukan aplikasi produksi. Gunakan bahasa Indonesia.

## Tentang saya

- Menguasai dasar HTML, CSS, JavaScript, PHP, MySQL, REST API, dan dasar OOP.
- Pernah belajar React dan Vite. Sekarang mengulang React sambil belajar Next.js untuk pertama kalinya.
- Paham dasar TypeScript.
- Pengalaman: magang membangun sistem reservasi + pembayaran (PHP/MySQL). Proyek pribadi dengan React, Express, PostgreSQL, Docker, JWT (access + refresh token), Redis, rate limiting, dan deploy. Konsep auth, database, dan cache sudah dikuasai, yang dipelajari di sini adalah cara Next.js melakukannya.
- Tujuan: mampu menulis kode sendiri, bukan sekadar menghasilkan aplikasi lewat AI.

## Cara membimbing

- Jelaskan konsep dulu, beri contoh sederhana, lalu beri latihan yang saya kerjakan sendiri.
- Jangan menuliskan kode latihan untuk saya. Saya yang menulis, Claude yang mereview.
- Kalau ada kesalahan, beri petunjuk dulu sebelum solusi lengkap.
- Satu konsep dalam satu waktu. Kaitkan dengan JavaScript murni atau PHP bila relevan.
- Pesan harus ringkas. Teks yang terlalu panjang membuat saya melewatkan isinya.
- Setiap latihan harus disertai contoh hasil akhir yang konkret (tabel, URL, atau HTML yang diharapkan), supaya targetnya jelas.
- Jangan mengubah konfigurasi atau struktur folder tanpa menjelaskan alasannya dan meminta persetujuan.
- Setiap poin review harus menjelaskan **di mana** (file + baris), **kenapa** salah, dan **bagaimana** arah perbaikannya. Jangan hanya menyebut masalahnya. Ingat bahwa saya masih pemula di Next.js.

## Roadmap

1. **Review React:** JSX, components, props, useState, event, conditional rendering, list, forms, useEffect, custom hooks. ✅ Selesai (2026-11-02)
2. **Dasar Next.js:** struktur project, App Router, pages & layouts, navigasi (`<Link>`), Server & Client Components, `"use client"`. ✅ Selesai (2026-11-03)
3. **Praktik:** fetching data, API, loading & error, dynamic routes, forms & validasi, auth, pengelolaan data. ⏳ Sedang berjalan
4. **Proyek praktik terbimbing.**

## Progres

| No | Materi | File | Status |
|----|--------|------|--------|
| 1 | Props | `app/latihan/components/Card.tsx` | ✅ |
| 2 | useState | `app/latihan/components/Quantity.tsx` | ✅ |
| 3 | Lifting state | `app/latihan/components/ColorPanel.tsx` | ✅ |
| 4 | Conditional rendering | | ✅ |
| 5 | List & `key` | `app/latihan/page.tsx` | ✅ |
| 6 | Forms | `app/latihan/components/NameForm.tsx` | ✅ |
| 7 | useEffect dependency | `app/latihan/components/TitleCounter.tsx` | ✅ |
| 8 | useEffect cleanup | `app/latihan/components/WindowWidth.tsx` | ✅ |
| 9 | Custom hook | `app/latihan/hooks/useWindowWidth.ts` | ✅ |
| 10 | Nested layout & `<Link>` | `app/latihan/layout.tsx` | ✅ |
| 11 | Server & Client Component | `app/latihan/components/WindowWidth.tsx` | ✅ |
| 12 | Fetch di Server Component & `loading.tsx` | `app/latihan/user/page.tsx` | ✅ |
| 13 | Penanganan error & `error.tsx` | `app/latihan/user/error.tsx` | ✅ |
| 14 | `"use cache"` & `cacheLife` | `app/latihan/user/page.tsx` | ✅ |
| 15 | Dynamic routes `[id]` | `app/latihan/user/[id]/page.tsx` | ✅ |
| 16 | `notFound()` & `not-found.tsx` | `app/latihan/user/[id]/not-found.tsx` | ✅ |
| 17 | Form & Server Action | `app/latihan/tamu/page.tsx` | ✅ |
| 18 | `useActionState` & status pending | `app/latihan/tamu/FormTamu.tsx` | ✅ |

**Catatan Latihan 10:** `<a>` melakukan full reload sehingga semua state hilang. `<Link>` hanya mengganti `{children}`, sedangkan layout tetap hidup. Karena `cacheComponents: true` di `next.config.ts`, halaman lama tidak dibuang tetapi disembunyikan (`display: none`) oleh React `<Activity>`, jadi state di page juga bertahan (maksimal 3 halaman). Sudah dibuktikan lewat DevTools.

**Catatan Latihan 11:** Semua komponen di App Router default-nya Server Component. `"use client"` adalah batas: semua yang di-import file client ikut menjadi client, jadi cukup ditulis sekali. Batas harus dipasang di **komponen**, bukan di hook, karena hook berjalan di dalam komponen pemanggilnya (dibuktikan lewat error "Attempted to call ... from the server"). Taruh `"use client"` sedalam mungkin di pohon komponen. `"use server"` adalah direktif lain untuk Server Actions.

**Catatan Latihan 12:** Server Component bisa `async` dan langsung `await fetch(...)` tanpa `useState`/`useEffect`. `console.log`-nya muncul di terminal, bukan di browser. Dengan `cacheComponents`, fetch yang tidak di-cache memicu peringatan "Blocking Route". Solusinya `loading.tsx` (Next.js membungkus page dengan `<Suspense>`) atau `"use cache"`. Awalnya sempat menulis versi Client Component (`useEffect`), lalu berhasil diubah ke versi server.

**Catatan Latihan 13:** `fetch` tidak melempar error untuk 404/500, jadi periksa `response.ok` lalu `throw new Error(...)`. Error yang dilempar ditangkap `error.tsx` terdekat, jadi tidak perlu try/catch kecuali ingin menangani error di tempat. `error.tsx` wajib `"use client"` karena ada interaksi (tombol) dan error boundary harus berjalan di browser. Di Next.js 16 gunakan prop `retry` (mengambil ulang data), bukan `reset` (hanya menggambar ulang tanpa fetch). Di production, `error.message` dari server disembunyikan.

**Catatan Latihan 14:** `"use cache"` di baris pertama fungsi `async` menyimpan hasilnya di memori server (mirip Redis), dengan umur yang diatur `cacheLife(...)`. Cache **dipakai bersama semua pengunjung**, jadi hanya cache data publik (daftar produk, artikel), jangan data milik user (keranjang, profil, pembayaran). Pasang di fungsi pengambil data, bukan di seluruh halaman. Di dev, log server diteruskan ke console browser dengan label "Cache" atau "Server".

**Catatan Latihan 15:** Folder `[id]` menangkap bagian URL apa pun. Nilainya dibaca lewat `const { id } = await params` (tipe `PageProps<"/latihan/user/[id]">`). `id` selalu `string` karena URL adalah teks (sama seperti `$_GET`). Nama properti harus sama dengan nama di kurung siku. Karena `partialPrefetching: true`, membaca `params` di luar Suspense memicu peringatan "URL data outside of Suspense", dan `loading.tsx` di folder `[id]` sendiri menghilangkannya (yang di folder induk tidak cukup). `error.tsx` dan `loading.tsx` berlaku untuk subfolder juga. Link dinamis ditulis di dalam `.map()`: `` href={`/latihan/user/${user.id}`} ``.

**Catatan Latihan 16:** Data tidak ada (404) ≠ server rusak (500). `notFound()` (dari `next/navigation`) ditangkap `not-found.tsx`, sedangkan `throw new Error` selalu ditangkap `error.tsx`, mirip `catch` berdasarkan jenis exception. Cek `response.status === 404` **di dalam** `if (!response.ok)` sebelum `throw`. `not-found.tsx` tidak perlu `"use client"` karena `<Link>` bukan interaksi `onClick`. Jangan menaruh `<Link>` di dalam `<button>`. `retry()` mengulang halaman untuk URL yang sedang dibuka, bukan `page.tsx` di folder induk, karena page tidak bertingkat seperti layout.

**Catatan Latihan 17:** Server Action adalah fungsi `async` dengan `"use server"` yang diberikan ke `<form action={fn}>`. Fungsi ini menerima `FormData` (seperti `$_POST`), dan Next.js otomatis membuat endpoint POST ke URL halaman itu sendiri. Siapa pun bisa memanggilnya, jadi validasi wajib dilakukan di dalam fungsi. `formData.get()` bertipe `string | File | null`, sehingga perlu *type narrowing* dengan `typeof nama !== "string"` (short-circuit `||` membuat `.trim()` aman). Panggil `refresh()` dari `next/cache` setelah mengubah data.

**Catatan Latihan 18:** `const [state, formAction, pending] = useActionState(action, initialState)` di Client Component. Action menerima `(prevState, formData)`, dan nilai return-nya menjadi `state` berikutnya, jadi bentuknya harus sama dengan `initialState`. Server Action untuk Client Component ditulis di file terpisah dengan `"use server"` di baris 1. Halaman yang membaca data server tetap Server Component, karena kalau dijadikan client, browser mendapat salinan array sendiri. `import` tidak menyalin: semua file mendapat array yang sama, dan proses Node.js terus hidup (berbeda dengan PHP yang mulai dari nol tiap request). React 19 otomatis mengosongkan input form setelah action selesai, bukan karena `refresh()`.

**Posisi sekarang:** Fase 3 cukup (sisa materi dipelajari di dalam proyek). **Fase 4 dimulai 2026-11-05: proyek 1, To-Do App Next.js**, project baru terpisah (`Desktop/todo-nextjs`, repo sendiri untuk portfolio) dengan **MySQL**, tanpa auth dulu. Tahapan: (1) setup + DB, (2) daftar todo dari DB, (3) tambah (Server Action + `useActionState`), (4) selesai & hapus, (5) edit `[id]` + `notFound()`, (6) loading/error. Proyek 2 nanti: booking app + auth.

**Proyek 1, Tahap 1 ✅ (2026-11-06):** tabel `todos` (id, title, done, created_at), `.env.local`, `lib/db.ts` (pool `mysql2` + `server-only`, export default). Pool dibuat sekali karena proses Node hidup terus. Env yang hilang menjadi `undefined`, dan `mysql2` diam-diam memakai default, jadi error baru muncul saat query. Validasi env dengan `throw` sengaja tidak dipakai (pilihan sendiri).

**Proyek 1, Tahap 2 ✅ (2026-11-07):** `app/page.tsx` query langsung dengan `pool.query<Todo[]>` (interface `extends RowDataPacket`), plus `app/loading.tsx`. Tanpa cache, setiap refresh menjalankan query ulang (sudah dibuktikan dengan insert lewat SQL). `loading.tsx` hanya menampilkan sesuatu selama menunggu. `TINYINT(1)` datang sebagai `0`/`1`, jadi tipenya `number`, dan `{0 && x}` menampilkan "0". Di JS `[]` bernilai truthy (berbeda dengan PHP). Sempat mencampur istilah cache/catch dan loading/login.

## Hal yang perlu dipantau

- Pernah tertukar antara `onClick={fungsi}` dan `onClick={fungsi()}`.
- Pernah menggabungkan beberapa state dalam satu kondisi tampilan.
- Pernah mengira bilangan negatif bernilai falsy (sudah diluruskan).
- Sering memperbaiki poin utama review tetapi melewatkan poin kecil. Beri catatan bernomor dan minta dicek satu per satu.
- Cenderung kembali ke pola lama (`useEffect` untuk fetch) saat ada pola baru.
- Istilah kadang kurang tepat walaupun konsepnya benar. Sering menyimpulkan aturan umum dari satu percobaan.

> Perbarui bagian **Progres** setiap kali satu latihan selesai.
