import React, { useState, useEffect } from "react";
import { fetchFeed } from "services/posts/api";
import TagContainer from "components/tag";
import FilterButton from "components/filter-button";

export interface FeedProps {}

const Feed: React.FC<FeedProps> = ({}) => {
  const [state, setState] = useState({
    isLoading: false,
    articles: []
  });

  async function componentDidMount() {
    setState(Object.assign({}, state, { isLoading: true }));
    let res = await fetchFeed();
    setState(Object.assign({}, state, { isLoading: false }));

    if (res.ok) {
      let body = await res.json();
      let articles = body.data.resources;
      console.log(articles);
      setState(Object.assign({}, state, { articles: articles }));
    } else alert("Try again");
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <div id="feed-container">
      <FilterButton />
      <h2 className="section-heading" id="feed-start">
        Latest Articles.
      </h2>
      {state.articles.map((article: any) => (
        <div key={article.id} className="article">
          <span className="description">
            {article.company !== "" ? "By " + article.company + " on " : ""}
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }).format(article.date)}
          </span>
          <div className="article-title">
            <a href={article.uri}>{article.title}</a>
          </div>
          {article.categories.map((tag: string) => (
            <TagContainer tagName={tag} key={tag} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Feed;
