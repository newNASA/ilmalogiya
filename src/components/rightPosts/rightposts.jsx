import { Link } from "react-router-dom";
import { BsTelegram } from "react-icons/bs";
import "./rightposts.scss";
import { stripHTML } from "../../utils/stripHTML";
import { memo } from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaArrowRightLong, FaQuoteLeft } from "react-icons/fa6";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";

const RightPosts = ({ randomPost, lastPost, randomQuote }) => {
  const cleanRandomDesc = stripHTML(randomPost?.description || "");
  const cleanLastDesc = stripHTML(lastPost?.description || "");

  return (
    <div className="rightposts">
      <div className="telegram shadow-elegant">
        <div className="top">
          <h2>Kanalimizga Qo'shiling!</h2>
        </div>
        <div className="text">
          <p>
            Eng so'nggi yangiliklar, maqolalar va texnologiyalar haqida birinchi
            bo'lib xabardor bo'ling!
          </p>
        </div>
        <div className="link">
          <a
            href="https://t.me/+26yhVjOr9M0wMDli"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTelegram /> Telegram
          </a>
          <a
            href="https://www.instagram.com/ilmalogiya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram /> Instagram
          </a>
        </div>
      </div>

      {/* Random Quote */}
      {randomQuote && (
        <div className="sidebar-quote shadow-elegant">
          <h2>Iqtibos</h2>
          <div className="sidebar-quote__body">
            <FaQuoteLeft className="sidebar-quote__icon" />
            <p className="sidebar-quote__text">{randomQuote.text}</p>
          </div>
          {randomQuote.author && (
            <Link
              to={`/quotes/author/${randomQuote.author.slug}`}
              className="sidebar-quote__author"
            >
              {randomQuote.author.photo && (
                <img
                  src={resolveMediaUrl(randomQuote.author.photo)}
                  alt={randomQuote.author.name}
                  className="sidebar-quote__author-img"
                />
              )}
              <span>— {randomQuote.author.name}</span>
            </Link>
          )}
        </div>
      )}

      {randomPost && (
        <div className="randompost shadow-elegant">
          <div className="top">
            <h2>Random Post</h2>
          </div>
          {randomPost.file && (
            <div className="img">
              <img 
                src={resolveMediaUrl(randomPost.file)} 
                alt={randomPost.title} 
              />
            </div>
          )}
          <div className="post_tags">
            {randomPost.tags?.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagClick?.(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="title">
            <Link to={`/posts/${randomPost.slug}`}>
              <h3>{randomPost.title}</h3>
            </Link>
          </div>
          <div className="text">
            <p>
              {cleanRandomDesc.length > 200
                ? cleanRandomDesc.slice(0, 200) + "..."
                : cleanRandomDesc}
            </p>
          </div>
          <div className="post_link">
            <Link to={`/posts/${randomPost.slug}`}>
              To'liq o'qish <FaArrowRightLong />
            </Link>
          </div>
        </div>
      )}

      {lastPost && (
        <div className="lastpost shadow-elegant">
          <div className="top">
            <h2>Oxirgi Post</h2>
          </div>
          {lastPost.file && (
            <div className="img">
              <img 
                src={resolveMediaUrl(lastPost.file)} 
                alt={lastPost.title} 
              />
            </div>
          )}
          <div className="post_tags">
            {lastPost.tags?.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagClick?.(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="title">
            <Link to={`/posts/${lastPost.slug}`}>
              <h3>{lastPost.title}</h3>
            </Link>
          </div>
          <div className="text">
            <p>
              {cleanLastDesc.length > 200
                ? cleanLastDesc.slice(0, 200) + "..."
                : cleanLastDesc}
            </p>
          </div>
          <div className="post_link">
            <Link to={`/posts/${lastPost.slug}`}>
              To'liq o'qish <FaArrowRightLong />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(RightPosts);