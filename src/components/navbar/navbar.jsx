import './navbar.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import { PiMoneyDuotone } from "react-icons/pi";
import SearchBar from '../searchbar/searchbar.jsx';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from 'react';

function Navbar({ posts }) {
    const [menuOpen, setMenuOpen] = useState(false);


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

    return (
        <>
            <nav>
                <Link to='/' className="logo">
                    <img src={logo} alt="Ilmalogiya logo" />
                    <h1>Ilmalogiya</h1>
                </Link>

                <ul className="links">
                    <li>
                        <Link to='https://tirikchilik.uz/ilmalogiya' className='donat' target='_blank'>
                            <PiMoneyDuotone /> Donat qilish
                        </Link>
                    </li>
                    <SearchBar posts={posts} />
                </ul>

                <div className="burger-menu" onClick={() => setMenuOpen(true)}>
                    <GiHamburgerMenu />
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <SearchBar posts={posts} />
                    <button onClick={() => setMenuOpen(false)} className='close'><IoClose /></button>
                </div>

                {/* <ul>
                    <li>
                        <Link to='/' onClick={() => setMenuOpen(false)}>Bosh sahifa</Link>
                    </li>
                    <li>
                    </li>
                </ul> */}

                <div className="menu-footer">
                    <Link to='https://tirikchilik.uz/ilmalogiya' className='donat' target='_blank' onClick={() => setMenuOpen(false)}>
                        <PiMoneyDuotone /> Donat qilish
                    </Link>
                </div>
            </div>

            {/* Qoraygan fon */}
            {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
        </>
    );
}

export default Navbar;