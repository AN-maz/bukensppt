# bukensppt — Presentasi Statis dari Markdown

Web presentasi statis tanpa build step. Materi ditulis di markdown, browser merender jadi slide (Reveal.js).

## Menjalankan

```bash
python3 -m http.server 8000
```

Buka http://localhost:8000

> `fetch()` butuh HTTP server, buka via `file://` tidak bisa.

## Menulis materi

Edit `slides/deck.md`. Tambah file baru → daftarkan di array `SLIDE_FILES` di `app.js`.

### Sintaks

| Penulisan              | Fungsi                              |
| ---------------------- | ----------------------------------- |
| `---`                  | Slide horizontal baru               |
| `<!-- vertical -->`    | Slide vertikal (di bawah slide aktif) |
| `<!-- center -->`      | Rata tengah (judul, penutup)        |
| `<!-- fragments -->`   | Semua `<p>` dan `<li>` muncul satu per satu |
| `<!-- notes -->`       | Catatan pembicara                   |
| `<!-- ... -->` di awal | Frontmatter, diabaikan              |

### Contoh slide

```markdown
---

## Judul Slide

- poin satu
- poin dua

### Sub bagian

```js
console.log("kode di-highlight");
```

<!-- notes

Catatan ini muncul di speaker view (tekan S).

-->
```

## Navigasi

| Tombol  | Aksi                    |
| ------- | ----------------------- |
| → ← ↑ ↓ | Navigasi slide          |
| Spasi   | Slide berikutnya        |
| F       | Fullscreen              |
| S       | Speaker view            |
| Esc     | Overview semua slide    |
| T       | Ganti tema (atau klik ○) |

## Struktur

```
index.html      entry point (CDN Reveal.js + marked.js)
app.js          fetch markdown → parse → init Reveal
style.css       styling tambahan
slides/deck.md  materi presentasi
```

## Tema

Klik tombol **◐** kanan bawah (atau tekan T): white, black, moon, sky, league, dracula, solarized.
