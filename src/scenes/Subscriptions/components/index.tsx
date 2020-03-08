import React from "react";
// import { fetchSubscriptions } from "services/posts/api";

export interface SubscriptionsProps {}

export interface SubscriptionsState {
  isLoading: boolean;
  articles: Array<any>;
}

class Subscriptions extends React.Component<
  SubscriptionsProps,
  SubscriptionsState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      articles: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    // let res = await fetchSubscriptions();
    this.setState({ isLoading: false });

    /* 
    if (res.ok) {
      let body = await res.json();
      let articles = body.data.resources;
      console.log(articles);
      this.setState({ articles: articles });
    } else alert("Try again"); */
  }
  render() {
    return <div>Hello</div>;
  }
}

export default Subscriptions;
