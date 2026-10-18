/**
 * Konfigurasi: daftar file markdown (urutan = urutan slide).
 * Tambah file baru ke array ini lalu tulis materinya di folder slides/.
 */
const SLIDE_FILES = ["slides/deck.md"];

const THEMES = [
  "white",
  "black",
  "moon",
  "sky",
  "league",
  "dracula",
  "solarized",
];

marked.setOptions({ gfm: true, breaks: false });

/* ------------------------------------------------------------------ */
/* Parsing markdown → HTML section                                      */
/* ------------------------------------------------------------------ */

function extractNotes(md) {
  const notes = [];
  const cleaned = md.replace(/^\s*<!--\s*notes\s*([\s\S]*?)-->\s*$/gim, (_, body) => {
    notes.push(body.trim());
    return "";
  });
  return { md: cleaned, notes: notes.join("\n") };
}

function extractMeta(md) {
  const meta = { center: false, fragments: false };
  md = md.replace(/^\s*<!--\s*center\s*-->\s*$/mi, () => {
    meta.center = true;
    return "";
  });
  md = md.replace(/^\s*<!--\s*fragments\s*-->\s*$/mi, () => {
    meta.fragments = true;
    return "";
  });
  return { md, meta };
}

function renderChunk(md) {
  let { md: body, notes } = extractNotes(md);
  const { md: clean, meta } = extractMeta(body);

  let html = marked.parse(clean.trim());

  if (meta.fragments) {
    html = html.replace(/<li>/g, '<li class="fragment">');
    html = html.replace(
      /<p>/g,
      '<p class="fragment">'
    );
  }

  let section = `<section${meta.center ? ' class="slide-center"' : ""}>${html}`;
  if (notes) {
    section += `<aside class="notes">${marked.parse(notes)}</aside>`;
  }
  section += "</section>";
  return section;
}

function parseDeck(md) {
  // buang frontmatter opsional (--- di awal file)
  md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

  const sections = md.split(/^\s*---\s*$/m);
  return sections
    .map((section) => {
      // vertical: potongan dipecah oleh <!-- vertical -->
      const verticals = section.split(/^\s*<!--\s*vertical\s*-->\s*$/mi);
      if (verticals.length === 1) {
        return renderChunk(section);
      }
      const inner = verticals
        .filter((v) => v.trim().length > 0)
        .map(renderChunk)
        .join("");
      return `<section>${inner}</section>`;
    })
    .filter((s) => s.replace(/<[^>]+>/g, "").trim().length > 0)
    .join("");
}

/* ------------------------------------------------------------------ */
/* Load & init                                                         */
/* ------------------------------------------------------------------ */

async function loadDeck() {
  const parts = [];
  for (const file of SLIDE_FILES) {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(res.status);
      parts.push(await res.text());
    } catch (err) {
      parts.push(`# Gagal memuat ${file}\n\n\`${err.message}\`\n\nCara menjalankan: \`python3 -m http.server\` di folder ini, lalu buka http://localhost:8000`);
    }
  }
  return parts.join("\n\n");
}

function applyTheme(name) {
  document.getElementById("theme-css").href =
    `https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/${name}.css`;
  document.documentElement.style.setProperty(
    "--page-bg",
    name === "white" || name === "sky" || name === "solarized" ? "#fff" : "#000"
  );
  document.documentElement.style.setProperty(
    "--accent",
    name === "white" || name === "sky" || name === "solarized" ? "#2563eb" : "#60a5fa"
  );
  localStorage.setItem("deck-theme", name);
}

function initTheme() {
  const saved = localStorage.getItem("deck-theme") || "white";
  applyTheme(saved);
  document.getElementById("theme-btn").addEventListener("click", () => {
    const current = localStorage.getItem("deck-theme") || "white";
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    applyTheme(next);
  });
}

async function init() {
  initTheme();
  const md = await loadDeck();
  document.getElementById("slides").innerHTML = parseDeck(md);

  new Reveal({
    hash: true,
    slideNumber: "c/t",
    progress: true,
    controls: true,
    transition: "slide",
    plugins: [RevealHighlight, RevealNotes],
  }).initialize();
}

init();
