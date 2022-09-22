import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const NewsFeedContent = ({ filterData, loading }) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <PuffLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="left-content-wrapper">
          {filterData.map((item, index) => (
            <div
              key={index}
              className={`${
                filterData.length === 0 ? "left-content-noData" : "left-content"
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
              {/* <div className="news-link-wrapper">
                <a
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                  className="news-link"
                >
                  {item.url}
                </a>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NewsFeedContent;
