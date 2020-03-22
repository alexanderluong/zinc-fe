import React, { useEffect, useState } from "react";
import { getSubscriptions } from "services/categories/api";
import { SystemState } from "store/system/types";
import { Redirect } from "react-router-dom";

export interface SubscriptionsProps {
  systemState: SystemState;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ systemState }) => {
  const [state, setState] = useState({
    isLoading: false,
    subscriptions: []
  });

  async function componentDidMount() {
    setState(Object.assign({}, state, { isLoading: true }));
    let res = await getSubscriptions();
    setState(Object.assign({}, state, { isLoading: false }));
    if (res.ok) {
      let body = await res.json()
      let categories = body.data.resources;
      setState(Object.assign({}, state, { subscriptions: categories }));
      console.log(categories);
      // systemState.session gets the user key
    } else {
      alert("Subscriptions could not be fetched!")
    }
    /* 
    if (res.ok) {
      let body = await res.json();
      let articles = body.data.resources;
      console.log(articles);
      this.setState({ articles: articles });
    } else alert("Try again"); */
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  if (!systemState.loggedIn) return <Redirect to="/" />;
  else
    return (
      <div id="subscriptions-container">
        <h2 className="section-heading" id="subscriptions-start">
          Subscriptions
        </h2>
        {state.subscriptions.map((subscription: any) => (
          <p key={subscription}>{subscription}</p>
        ))}
      </div>
      // <div id="not-found-container">
      //   <h3 className="section-heading">Hello, {systemState.firstName}!</h3>
      //   <p>Coming soon: manage your email subscriptions.</p>
      // </div>
    );
};

export default Subscriptions;
