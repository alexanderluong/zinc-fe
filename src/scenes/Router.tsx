import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { LoginScene } from "./Login";
import { FeedScene } from "./Feed";
import { NotFoundScene } from "./NotFound";
import { SubmitPostScene } from "./SubmitPost";
import { SignUpScene } from "./SignUp"
import NavBar from "../components/navbar";

export const Router: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div id="navbar-bg"></div>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/" component={FeedScene} />
            <Route exact path="/login" component={LoginScene} />
            <Route exact path="/feed" component={FeedScene} />
            <Route exact path="/submit" component={SubmitPostScene} />
            <Route exact path="/signup" component={SignUpScene} />
            <Route exact path="*" component={NotFoundScene} status={404} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
};
