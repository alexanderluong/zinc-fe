import React from "react";
import { fetchFeed } from "services/posts/api";
import TagContainer from "components/tag";

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
        <h2 className="section-heading">Latest Articles.</h2>
        {this.state.articles.map((article: any) => (
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
              <div key={tag}>
                <TagContainer tagName={tag} key={tag} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Feed;
