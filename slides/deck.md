# Presentasi Statis dari Markdown

<!-- center -->

Web presentasi statis. Materi ditulis di file `.markdown`, web render jadi slide.

<!-- notes

Cara pakai:
1. Edit slides/deck.md
2. Jalankan server lokal
3. Buka browser, presentasi

-->

---

## Cara Pakai

1. Edit materi di `slides/deck.md`
2. Jalankan server lokal:

```bash
python3 -m http.server 8000
```

3. Buka `http://localhost:8000`
4. Navigasi: **→ ← ↑ ↓**, **Spasi**, **F** fullscreen, **Esc** overview

---

## Sintaks Markdown

| Penulisan       | Fungsi                        |
| --------------- | ----------------------------- |
| `---`           | Slide baru (horizontal)       |
| `<!-- vertical -->` | Slide vertikal (bawah)    |
| `<!-- center -->`   | Konten di tengah          |
| `<!-- fragments -->`| Animasi muncul per item   |
| `<!-- notes -->`    | Catatan pembicara (S)     |

<!-- vertical -->

### Catatan Pembicara

Tulis catatan di dalam `<!-- notes ... -->`.

Tekan **S** untuk buka speaker view.

---

## Kode Program

<!-- fragments -->

```js
const deck = await fetch("slides/deck.md");
const slides = deck.text().split(/^---$/m);
console.log(`${slides.length} slide dimuat`);
```

<!-- fragments -->

- Fragment muncul satu per satu
- Harus di awal slide

---

## Gambar & Tautan

![Demo](img/demo.svg)

Tautan: [Reveal.js Docs](https://revealjs.com/)

---

## Slide Baru

<!-- center -->

### Buat slide baru: tambah `---`

Selesai.

<!-- fragments -->
