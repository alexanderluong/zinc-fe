import React, { useEffect, useState } from "react";
import { getSubscriptions } from "services/categories/api";
import { getUserInfo } from "services/users/api"
import { SystemState } from "store/system/types";
import { Redirect } from "react-router-dom";
import "../subscriptions.css";

export interface SubscriptionsProps {
  systemState: SystemState;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ systemState }) => {
  const [state, setState] = useState({
    isLoading: false,
    allSubscriptions: [],
    userSubscriptions: []
  });

  async function componentDidMount() {
    setState(Object.assign({}, state, { isLoading: true }));
    let subscriptionsRes = await getSubscriptions();
    setState(Object.assign({}, state, { isLoading: false }));
    let userInfoRes = await getUserInfo(systemState.session);
    if (subscriptionsRes.ok) {
      let body = await subscriptionsRes.json();
      let categories = body.data.resources;
      setState(Object.assign({}, state, { allSubscriptions: categories }));
      console.log(categories);
      // systemState.session gets the user key
    } else {
      alert("Subscriptions could not be fetched!")
    }

    if (userInfoRes.ok) {
      let body = await userInfoRes.json();
      let userSubscriptions = body.data.subscriptions;
      setState(Object.assign({}, state, { userSubscriptions: userSubscriptions }))
      console.log(userSubscriptions);
    } else {
      alert("User information could not be fetched!")
    }
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  if (!systemState.loggedIn) return <Redirect to="/" />;
  else
    return (
      <div id="subscriptions-container">
        <h2 className="section-heading" id="subscriptions-start">
          Manage Subscriptions.
        </h2>
        {state.allSubscriptions.map((subscription: any) => (
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
