import React, { useState, useEffect } from "react";
import { fetchFeed } from "../services/posts/api";
import TagContainer from "./tag";
import "./feed.css";
import FilterMenu from "./filter-menu";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router";

export interface FeedProps {
  tags: string[] | undefined;
  companies: string[] | undefined;
  search: string | undefined;
}

const Feed: React.FC<FeedProps> = ({ tags, companies, search }) => {
  let heading = "";
  if (tags && tags.length > 0) {
    let capitalizedCategories = [];
    for (let i = 0; i < tags.length; i++) {
      capitalizedCategories.push(
        tags[i].charAt(0).toUpperCase() + tags[i].slice(1)
      );
    }
    heading += capitalizedCategories.join(", ");
  }
  if (tags && tags.length > 0 && companies && companies.length > 0)
    heading += " & ";
  if (companies && companies.length > 0) {
    let capitalizedCompanies = [];
    for (let i = 0; i < companies.length; i++) {
      capitalizedCompanies.push(
        companies[i].charAt(0).toUpperCase() + companies[i].slice(1)
      );
    }
    heading += capitalizedCompanies.join(", ");
  }

  const [state, setState] = useState({
    isLoading: false,
    articles: [],
    heading: heading === "" ? "Latest Articles" : heading,
    feedError: false,
  });

  async function componentDidMount() {
    setState(Object.assign({}, state, { isLoading: true }));
    let res = await fetchFeed(tags, companies, search);
    setState(Object.assign({}, state, { isLoading: false }));

    if (res.ok) {
      let body = await res.json();
      let articles = body.data.resources;
      setState(Object.assign({}, state, { articles: articles }));
    } else {
      setState(Object.assign({}, state, { feedError: true }));
    }
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  if (state.feedError) {
    return (
      <React.Fragment>
        <FilterMenu key={state.heading} />

        <div id="feed-container">
          <h2 className="section-heading" id="feed-start">
            {state.heading}.
          </h2>
          Articles could not be loaded. Please try again later!
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <FilterMenu key={state.heading} />

      <div id="feed-container">
        <h2 className="section-heading" id="feed-start">
          {state.heading}.
        </h2>
        {state.articles.map((article: any) => (
          <div key={article.id} className="article">
            <span className="description">
              {article.company !== "" && "By "}
              {article.company !== "" && (
                <a href={"/company/" + article.company}>{article.company}</a>
              )}
              {article.company !== "" && " on "}
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(article.date)}
            </span>
            <div className="article-title">
              <a target="_blank" rel="noopener noreferrer" href={article.uri}>
                {article.title}
              </a>
            </div>
            {article.categories.map((article_tag: string) => (
              <TagContainer tagName={article_tag} key={article_tag} />
            ))}
          </div>
        ))}
        {state.articles.length === 0 ? "No articles found" : ""}
      </div>
    </React.Fragment>
  );
};

export default Feed;
