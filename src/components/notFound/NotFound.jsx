import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineArticle } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import "./notFound.scss";

function NotFound({
  title = "Post topilmadi",
  text = "Siz izlagan sahifa o'chirilgan yoki manzili o'zgargan bo'lishi mumkin. Quyidagi bo'limlardan kerakli ma'lumotni topishingiz mumkin.",
}) {
  return (
    <div className="notfound shadow-elegant">
      <div className="notfound-icon">
        <FaMagnifyingGlass />
        <span className="notfound-code">404</span>
      </div>

      <h1>{title}</h1>
      <p>{text}</p>

      <div className="notfound-actions">
        <Link to="/" className="notfound-btn primary">
          <FaArrowLeftLong /> Bosh sahifa
        </Link>
        <Link to="/" className="notfound-btn">
          <MdOutlineArticle /> Maqolalar
        </Link>
        <Link to="/quotes" className="notfound-btn">
          <FaQuoteRight /> Iqtiboslar
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
