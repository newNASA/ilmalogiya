export const stripHTML = (html) => {
  if (!html) return "";
  html = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h\d>/gi, "\n")
    .replace(/<\/li>/gi, "\n");
  
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.replace(/\s+/g, " ").trim();
};