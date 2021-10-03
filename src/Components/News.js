import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem.js";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + word.slice(1, lower.length);
  };


  document.title = `${
    props.category === "" ? "AbTak - Khabar Aap Tak Sbse Tez"
    : (capitalize(props.category) + " - AbTak")
  }`

  const updateNews = () => {
    props.Progress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      setArticles(results.articles);
      console.log(results);
    })
    props.Progress(100);
  };

  const fetchData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

    fetch(url).then((response) => {
      return response.json()
    }).then((results) => {
      setPage(page + 1);
      setArticles(articles.concat(results.articles));
      setTotalResults(results.totalResults);
    })
  }

  useEffect(() => {
    updateNews();
    //eslint-disable-next-line
  },[]);

  const isLoading = () => {
    return (
      <div style={{marginTop: "90px"}}>
        <div className="container my-5 text-center"> 
          <p>Please wait loading......</p>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  } 

  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center" style={{ margin: "80px 35px 0px" }}>AbTak {capitalize(props.category)} Top-headlines</h2>
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchData}
          hasMore={articles?.length !== totalResults}
          loader={isLoading()}
          scrollableTarget="scrollableDiv"
        >
          <div className="container">
            <div className="row">
              {articles?.map((elem) => (
                <div className="col-md-4" key={elem.url}>
                  <NewsItem
                    title={
                      elem.title?.length > 0
                        ? elem.title.slice(0, 50)
                        : elem.title
                    }
                    description={
                      elem.description?.length > 0
                        ? elem.description.slice(0, 70)
                        : elem.description
                    }
                    author={
                      elem.author === null
                        ? "Unknown"
                        : elem.author
                    }
                    urltoImage={elem.urlToImage}
                    publishedAt={elem.publishedAt}
                    source={elem.source.name}
                    newsUrl={elem.url}
                    mode={props.mode}
                    toggleMode={props.toggleMode}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 6,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
