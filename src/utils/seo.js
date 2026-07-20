const SITE_URL = "https://ilmalogiya.uz";
const DEFAULT_TITLE = "Ilmalogiya — ilmiy maqolalar va iqtiboslar";
const DEFAULT_DESCRIPTION =
  "Ilmalogiya — qiziqarli ilmiy maqolalar, tarixiy voqealar va mashhur insonlar iqtiboslari o'zbek tilida.";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeRobotsMeta() {
  document.head.querySelector('meta[name="robots"]')?.remove();
}

/**
 * Sahifa meta teglarini yangilaydi.
 * @param {object} opts
 * @param {string} [opts.title] — sahifa titlei (| Ilmalogiya avtomatik qo'shilmaydi)
 * @param {string} [opts.description]
 * @param {string} [opts.path] — canonical uchun yo'l, masalan "/posts/mening-postim"
 * @param {string} [opts.image] — og:image uchun to'liq URL
 * @param {boolean} [opts.noindex] — true bo'lsa robots noindex qo'yiladi (404 sahifalar uchun)
 */
export function setPageMeta({ title, description, path, image, noindex } = {}) {
  const t = title || DEFAULT_TITLE;
  const d = description || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path || "/"}`;

  document.title = t;
  upsertMeta("name", "description", d);
  upsertMeta("property", "og:title", t);
  upsertMeta("property", "og:description", d);
  upsertMeta("property", "og:url", url);
  if (image) upsertMeta("property", "og:image", image);
  upsertCanonical(url);

  if (noindex) {
    upsertMeta("name", "robots", "noindex");
  } else {
    removeRobotsMeta();
  }
}

/** Meta teglarni sayt default holatiga qaytaradi. */
export function resetPageMeta() {
  setPageMeta({});
}
