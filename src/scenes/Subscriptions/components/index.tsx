import React, { useEffect, useState } from "react";
import { getSubscriptions } from "services/categories/api";
import { getUserInfo } from "services/users/api"
import { SystemState } from "store/system/types";
import { Redirect } from "react-router-dom";
import TransferList from "../components/transferlist";
import "../subscriptions.css";
import { Button } from "@material-ui/core";

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
    let userInfoRes = await getUserInfo(systemState.session);
    setState(Object.assign({}, state, { isLoading: false }));

    if (subscriptionsRes.ok && userInfoRes.ok) {
      let subscriptionBody = await subscriptionsRes.json();
      let userInfoBody = await userInfoRes.json();
      let userSubscriptions = userInfoBody.data.subscriptions;
      let categories = subscriptionBody.data.resources;
      setState(Object.assign({}, state, { allSubscriptions: categories, userSubscriptions: userSubscriptions }));
    } else {
      alert("Subscriptions could not be fetched!")
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
        <TransferList allSubscriptions={state.allSubscriptions} userSubscriptions={state.userSubscriptions}/>
        <Button variant="contained">Submit</Button>
        {/* {state.allSubscriptions.map((subscription: any) => (
          <p key={subscription}>{subscription}</p>
        ))} */}
      </div>
      // <div id="not-found-container">
      //   <h3 className="section-heading">Hello, {systemState.firstName}!</h3>
      //   <p>Coming soon: manage your email subscriptions.</p>
      // </div>
    );
};

export default Subscriptions;
