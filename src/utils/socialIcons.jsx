import {
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa6";

const ICON_MAP = [
  { match: ["t.me", "telegram.me", "telegram.org"], icon: FaTelegram, label: "Telegram" },
  { match: ["instagram.com"], icon: FaInstagram, label: "Instagram" },
  { match: ["youtube.com", "youtu.be"], icon: FaYoutube, label: "YouTube" },
  { match: ["facebook.com", "fb.com"], icon: FaFacebook, label: "Facebook" },
  { match: ["x.com", "twitter.com"], icon: FaXTwitter, label: "X" },
  { match: ["github.com"], icon: FaGithub, label: "GitHub" },
  { match: ["linkedin.com"], icon: FaLinkedin, label: "LinkedIn" },
  { match: ["tiktok.com"], icon: FaTiktok, label: "TikTok" },
];

export function getSocialMeta(url) {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return { Icon: FaGlobe, label: url };
  }

  for (const item of ICON_MAP) {
    if (item.match.some((d) => host === d || host.endsWith(`.${d}`))) {
      return { Icon: item.icon, label: item.label };
    }
  }
  return { Icon: FaGlobe, label: host };
}
