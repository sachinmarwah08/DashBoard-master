import React from "react";
import { FadeLoader } from "react-spinners";

const NewsFeedContent = ({ filterData, loading, lastUserRef }) => {
  console.log(filterData, "NewsFeed");
  return (
    <>
      {loading ? (
        <div className="loader">
          <FadeLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="left-content-wrapper">
          {filterData.map((item, index) =>
            filterData.length === index + 1 ? (
              <div
                ref={lastUserRef}
                key={index}
                className={`${
                  item.headline && item.news_source && "left-content-News"
                }`}
              >
                <a
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                  className="left-content-heading-news"
                >
                  {item.news_source}
                </a>
                <p className="hashtags-news">{item.headline}</p>
              </div>
            ) : (
              <div
                ref={lastUserRef}
                key={index}
                className={`${
                  item.headline && item.news_source && "left-content-News"
                }`}
              >
                <a
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                  className="left-content-heading-news"
                >
                  {item.news_source}
                </a>
                <p className="hashtags-news">{item.headline}</p>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default NewsFeedContent;
