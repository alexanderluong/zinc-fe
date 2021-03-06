import React, { useLayoutEffect } from "react";
import { Route, BrowserRouter, Switch, withRouter } from "react-router-dom";

import { LoginScene } from "./Login";
import { FeedScene } from "./Feed";
import { NotFoundScene } from "./NotFound";
import { SubmitPostScene } from "./SubmitPost";
import { SignUpScene } from "./SignUp";
import { TagFeed } from "./TagFeed";
import { CompanyFeed } from "./CompanyFeed";
import NavBar from "../components/navbar";
import { updateSession } from "store/system/actions";
import { SystemState } from "store/system/types";
import { connect } from "react-redux";
import { AppState } from "store";
import { SubscriptionsScene } from "./Subscriptions";
import { PlainFeed } from "./PlainFeed";
import ContactPopup from "components/contact-popup";

interface AppProps {
  updateSession: typeof updateSession;
  session: SystemState;
}

const Router: React.FC<AppProps> = ({ updateSession, session }) => {
  return (
    <BrowserRouter>
      <ContactPopup />
      <div id="navbar-bg"></div>
      <NavBar
        loggedIn={session.loggedIn}
        userRole={session.userRole}
        updateSession={updateSession}
      />
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(AppProps) => (
              <FeedScene
                loggedIn={session.loggedIn}
                firstName={session.firstName}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(AppProps) => (
              <LoginScene
                updateSession={updateSession}
                loggedIn={session.loggedIn}
              />
            )}
          />
          <Route
            exact
            path="/feed"
            render={(AppProps) => (
              <PlainFeed
                key={AppProps.location.search}
                params={AppProps.location.search}
              />
            )}
          />
          <Route
            exact
            path="/submit"
            render={(AppProps) => (
              <SubmitPostScene
                loggedIn={session.loggedIn}
                sessionToken={session.session}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(AppProps) => (
              <SignUpScene
                updateSession={updateSession}
                loggedIn={session.loggedIn}
              />
            )}
          />
          <Route
            exact
            path="/subscriptions"
            render={(AppProps) => <SubscriptionsScene systemState={session} />}
          />
          <Route
            exact
            path="/tags/:tag"
            render={(AppProps) => <TagFeed key={AppProps.match.params.tag} />}
          />
          <Route
            exact
            path="/company/:company"
            render={(AppProps) => (
              <CompanyFeed key={AppProps.match.params.company} />
            )}
          />
          <Route exact path="*" component={NotFoundScene} status={404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppState) => ({
  session: state.system,
});

export default connect(mapStateToProps, { updateSession })(Router);
