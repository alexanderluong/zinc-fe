import React, { useState } from "react";
// import { fetchSubscriptions } from "services/posts/api";
import { SystemState } from "store/system/types";
import { Redirect } from "react-router-dom";

export interface SubscriptionsProps {
  systemState: SystemState;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ systemState }) => {
  const [state, setState] = useState({
    isLoading: false,
    articles: []
  });

  async function componentDidMount() {
    setState(Object.assign({}, state, { isLoading: true }));
    // let res = await fetchSubscriptions();
    setState(Object.assign({}, state, { isLoading: false }));

    /* 
    if (res.ok) {
      let body = await res.json();
      let articles = body.data.resources;
      console.log(articles);
      this.setState({ articles: articles });
    } else alert("Try again"); */
  }

  if (!systemState.loggedIn) return <Redirect to="/" />;
  else
    return (
      <div id="not-found-container">
        <h3 className="section-heading">Hello, {systemState.firstName}!</h3>
        <p>Coming soon: manage your email subscriptions.</p>
      </div>
    );
};

export default Subscriptions;
