import { Link } from "react-router-dom";
import { BsTelegram } from "react-icons/bs";

import "./rightposts.scss";

const RightPosts = ({ randomPost, lastPost }) => {
  return (
    <div className="rightposts">
      <div className="telegram shadow-elegant">
        <div className="top">
          <h2>Kanalimizga Qo'shiling!</h2>
        </div>
        <div className="text">
          <p>Eng so'nggi yangiliklar, maqolalar va texnologiyalar haqida birinchi bo'lib xabardor bo'ling!</p>
        </div>
        <div className="link">
          <a href="https://t.me/ilmalogiya" target="_blank" rel="noopener noreferrer"><BsTelegram /> Kanalga qo'shilish</a>
        </div>
      </div>
      <div className="randompost shadow-elegant">
        <div className="top">
          <h2>Random Post</h2>
        </div>
        {randomPost.img ? (
          <div className="img">
            <img src={randomPost.img} alt="" />
          </div>
        ) : null}
        <div className="title">
          <Link to={`/posts/${randomPost.id}`}>
            <h3>{randomPost.title}</h3>
          </Link>
        </div>
        <div className="text">
          <p>{randomPost.description.length > 150
            ? randomPost.description.slice(0,150) + "..."
            : randomPost.description}</p>
        </div>
      </div>
      <div className="lastpost shadow-elegant">
        <div className="top">
          <h2>Oxirgi Post</h2>
        </div>
        {lastPost.img ? (
          <div className="img">
            <img src={lastPost.img} alt="" />
          </div>
        ) : null}
        <div className="title">
          <Link to={`/posts/${lastPost.id}`}>
            <h3>{lastPost.title}</h3>
          </Link>
        </div>
        <div className="text">
          <p>{lastPost.description.length > 150
            ? lastPost.description.slice(0,150) + "..."
            : lastPost.description}</p>
        </div>
      </div> 
    </div>
  );
};

export default RightPosts;
