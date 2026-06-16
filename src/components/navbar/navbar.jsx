import "./navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { PiMoneyDuotone } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { FaQuoteRight, FaBookmark } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { user, loginGoogle, logout } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogin() {
    setLoginLoading(true);
    try {
      await loginGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <img src={logo} alt="Ilmalogiya logo" />
          <h1>Ilmalogiya</h1>
        </Link>

        <ul className="links">
          <li>
            <Link to="/" className="nav-link">
              <MdOutlineArticle />
              Maqolalar
            </Link>
          </li>
          <li>
            <Link to="/quotes" className="nav-link">
              <FaQuoteRight />
              Iqtiboslar
            </Link>
          </li>
          <li>
            <Link
              to="https://tirikchilik.uz/ilmalogiya"
              className="donat"
              target="_blank"
            >
              <PiMoneyDuotone /> Donat qilish
            </Link>
          </li>

          {user ? (
            <li className="user-menu-wrapper" ref={userMenuRef}>
              <button
                className="user-avatar-btn"
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.full_name} className="user-avatar" />
                ) : (
                  <span className="user-avatar-placeholder">
                    {(user.full_name || user.email || "U")[0].toUpperCase()}
                  </span>
                )}
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-info">
                    <p className="user-dropdown-name">{user.full_name || "Foydalanuvchi"}</p>
                    <p className="user-dropdown-email">{user.email}</p>
                  </div>
                  <Link
                    to="/saved"
                    className="user-dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FaBookmark /> Saqlangan
                  </Link>
                  <button className="user-dropdown-logout" onClick={logout}>
                    Chiqish
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <button
                className="login-btn"
                onClick={handleLogin}
                disabled={loginLoading}
              >
                <FaGoogle />
                {loginLoading ? "Kirilmoqda..." : "Kirish"}
              </button>
            </li>
          )}
        </ul>

        <div className="burger-menu" onClick={() => setMenuOpen(true)}>
          <GiHamburgerMenu />
        </div>
      </nav>

      {/* Mobil menyu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h3>Bo'limlar</h3>
          <button onClick={() => setMenuOpen(false)} className="close">
            <IoClose />
          </button>
        </div>

        {user && (
          <div className="mobile-user-info">
            {user.avatar ? (
              <img src={user.avatar} alt={user.full_name} className="mobile-user-avatar" />
            ) : (
              <span className="mobile-user-placeholder">
                {(user.full_name || user.email || "U")[0].toUpperCase()}
              </span>
            )}
            <div>
              <p className="mobile-user-name">{user.full_name || "Foydalanuvchi"}</p>
              <p className="mobile-user-email">{user.email}</p>
            </div>
          </div>
        )}

        <ul className="mobile-links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <MdOutlineArticle /> Maqolalar
            </Link>
          </li>
          <li>
            <Link to="/quotes" onClick={() => setMenuOpen(false)}>
              <FaQuoteRight /> Iqtiboslar
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/saved" onClick={() => setMenuOpen(false)}>
                <FaBookmark /> Saqlangan
              </Link>
            </li>
          )}
        </ul>

        <div className="menu-footer">
          <Link
            to="https://tirikchilik.uz/ilmalogiya"
            className="donat"
            target="_blank"
            onClick={() => setMenuOpen(false)}
          >
            <PiMoneyDuotone /> Donat qilish
          </Link>

          {user ? (
            <button
              className="mobile-logout-btn"
              onClick={() => { logout(); setMenuOpen(false); }}
            >
              Chiqish
            </button>
          ) : (
            <button
              className="mobile-login-btn"
              onClick={() => { handleLogin(); setMenuOpen(false); }}
              disabled={loginLoading}
            >
              <FaGoogle /> {loginLoading ? "Kirilmoqda..." : "Google orqali kirish"}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;
