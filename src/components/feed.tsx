import React, { useState, useEffect } from "react";
import { fetchFeed } from "../services/posts/api";
import TagContainer from "./tag";
import "./feed.css";
import FilterMenu from "./filter-menu";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router";

export interface FeedProps {
  tag: string | undefined;
  company: string | undefined;
  search: string | undefined;
}

type PropsType = RouteComponentProps<FeedProps> & {
  tag: string | undefined;
  company: string | undefined;
  search: string | undefined;
};

const Feed: React.FC<PropsType> = ({ tag, company, search }) => {
  console.log(company);
  let heading = "";
  if (tag) {
    heading += "Category: " + tag.charAt(0).toUpperCase() + tag.slice(1);
  }
  if (tag && company) heading += " & ";
  if (company) {
    heading += "Company: " + company.charAt(0).toUpperCase() + company.slice(1);
  }

  const [state, setState] = useState({
    isLoading: false,
    articles: [],
    heading: heading === "" ? "Latest Articles" : heading
  });

  async function componentDidMount() {
    console.log(tag);
    setState(Object.assign({}, state, { isLoading: true }));
    let res = await fetchFeed(tag, company, search);
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
                year: "numeric"
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
      </div>
    </React.Fragment>
  );
};

export default withRouter(Feed);
