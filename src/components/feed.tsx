import React, { useState, useEffect } from "react";
import { fetchFeed } from "../services/posts/api";
import TagContainer from "./tag";
import FilterButton from "./filter-button";

export interface FeedProps {
  tags: string[];
  company: string;
  search: string;
}

const Feed: React.FC<FeedProps> = ({ tags, company, search }) => {
  const [state, setState] = useState({
    isLoading: false,
    articles: [],
    heading: tags.length
      ? tags[0].charAt(0).toUpperCase() + tags[0].slice(1)
      : "Latest Articles"
  });

  async function componentDidMount() {
    setState(Object.assign({}, state, { isLoading: true }));
    let res = await fetchFeed(tags, company, search);
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
        {state.heading}.
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
