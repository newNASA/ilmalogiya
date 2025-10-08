import "./footer.scss";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>© {year} Ilmalogiya. Barcha huquqlar himoyalangan.</p>
        </footer>
    );
}

export default Footer;