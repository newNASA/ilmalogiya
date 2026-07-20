import { useEffect, useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaQuoteLeft,
  FaHeading,
  FaListUl,
  FaLink,
} from "react-icons/fa6";

const FORMATS = [
  { key: "bold", title: "Qalin", icon: <FaBold /> },
  { key: "italic", title: "Kursiv", icon: <FaItalic /> },
  { key: "underline", title: "Tagiga chizish", icon: <FaUnderline /> },
  { key: "del", title: "O'chirilgan", icon: <FaStrikethrough /> },
  { key: "code", title: "Kod", icon: <FaCode /> },
  { key: "quote", title: "Iqtibos", icon: <FaQuoteLeft /> },
  { key: "h2", title: "Sarlavha", icon: <FaHeading /> },
  { key: "ul", title: "Ro'yxat", icon: <FaListUl /> },
  { key: "link", title: "Havola", icon: <FaLink /> },
];

function DescriptionEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  // Tashqaridan value o'zgarsa (masalan forma tozalansa) editorni sinxronlash.
  // Yozish paytida innerHTML bir xil bo'ladi — kursor joyi buzilmaydi.
  useEffect(() => {
    const el = editorRef.current;
    if (el && el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  function emitChange() {
    const el = editorRef.current;
    if (!el) return;
    // Bo'sh holatda brauzer <br> qoldiradi — tozalab yuboramiz
    const html = el.innerHTML === "<br>" ? "" : el.innerHTML;
    onChange(html);
  }

  function wrapSelectionWith(tagName) {
    const sel = window.getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) return;

    const wrapper = document.createElement(tagName);
    try {
      range.surroundContents(wrapper);
    } catch {
      // Belgilash bir nechta element chegarasidan o'tsa
      wrapper.appendChild(range.extractContents());
      range.insertNode(wrapper);
    }
    sel.removeAllRanges();
  }

  function applyFormat(key) {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    switch (key) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "del":
        document.execCommand("strikeThrough");
        break;
      case "h2":
        document.execCommand("formatBlock", false, "h2");
        break;
      case "quote":
        document.execCommand("formatBlock", false, "blockquote");
        break;
      case "ul":
        document.execCommand("insertUnorderedList");
        break;
      case "code":
        wrapSelectionWith("code");
        break;
      case "link": {
        const sel = window.getSelection();
        if (!sel.rangeCount || sel.isCollapsed) return;
        let url = window.prompt("Havola manzilini kiriting:", "https://");
        if (url === null) return;
        url = url.trim();
        if (!url || url === "https://") return;
        if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
        document.execCommand("createLink", false, url);
        // execCommand target qo'ymaydi — yangi havolalarga qo'shamiz
        el.querySelectorAll("a:not([target])").forEach((a) => {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        });
        break;
      }
      default:
        return;
    }

    emitChange();
  }

  return (
    <div className="desc-editor">
      <div className="desc-editor-toolbar">
        <div className="desc-editor-buttons">
          {FORMATS.map((f) => (
            <button
              key={f.key}
              type="button"
              title={f.title}
              onMouseDown={(e) => e.preventDefault()} // belgilash yo'qolmasligi uchun
              onClick={() => applyFormat(f.key)}
            >
              {f.icon}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={editorRef}
        className="desc-editor-content"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emitChange}
        onBlur={emitChange}
      />
    </div>
  );
}

export default DescriptionEditor;
