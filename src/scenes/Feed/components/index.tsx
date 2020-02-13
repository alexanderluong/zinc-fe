import * as React from "react";
import { Component } from "react";
import { fetchFeed } from "services/posts/api";

export interface FeedProps {}

export interface FeedState {
  isLoading: boolean;
  articles: Array<any>;
}

class Feed extends React.Component<FeedProps, FeedState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      articles: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    let res = await fetchFeed();
    this.setState({ isLoading: false });

    if (res.ok) {
      let body = await res.json();
      let articles = body.data.resources;
      console.log(articles);
      this.setState({ articles: articles });
    } else alert("Try again");
  }

  render() {
    return (
      <div>
        <h2>Latest Articles.</h2>
        {this.state.articles.map((article: any) => (
          <div key={article.id}>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }).format(article.date)}
            <h3>
              <a href={article.uri}>{article.title}</a>
            </h3>
            {article.company !== "" ? "By " + article.company + " on " : ""}
          </div>
        ))}
      </div>
    );
  }
}

export default Feed;
