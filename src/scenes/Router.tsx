import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { useLocation } from "react-router";

import { LoginScene } from "./Login";
import { FeedScene } from "./Feed";
import { NotFoundScene } from "./NotFound";
import { SubmitPostScene } from "./SubmitPost";
import { SignUpScene } from "./SignUp";
import { TagFeed } from "./TagFeed";
import NavBar from "../components/navbar";
import { updateSession } from "store/system/actions";
import { SystemState } from "store/system/types";
import { connect } from "react-redux";
import { AppState } from "store";
import { SubscriptionsScene } from "./Subscriptions";
import { Helmet } from "react-helmet";

interface AppProps {
  updateSession: typeof updateSession;
  session: SystemState;
}

const Router: React.FC<AppProps> = ({ updateSession, session }) => {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Vancity Tech</title>
        <meta property="og:title" content="Vancity Tech" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://zinc.argv.io" />
        <meta property="og:image" content="/android-chrome-256x256.png" />
        <meta
          property="og:description"
          content="Read great content from amazing tech companies in Vancouver!"
        />
        <meta
          name="description"
          content="Read great content from amazing tech companies in Vancouver!"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <React.Fragment>
        <div id="navbar-bg"></div>
        <NavBar loggedIn={session.loggedIn} updateSession={updateSession} />
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={AppProps => (
                <FeedScene
                  loggedIn={session.loggedIn}
                  firstName={session.firstName}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={AppProps => (
                <LoginScene
                  updateSession={updateSession}
                  loggedIn={session.loggedIn}
                />
              )}
            />
            <Route
              exact
              path="/feed"
              render={AppProps => (
                <FeedScene
                  loggedIn={session.loggedIn}
                  firstName={session.firstName}
                />
              )}
            />
            <Route
              exact
              path="/submit"
              render={AppProps => (
                <SubmitPostScene loggedIn={session.loggedIn} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={AppProps => (
                <SignUpScene
                  updateSession={updateSession}
                  loggedIn={session.loggedIn}
                />
              )}
            />
            <Route
              exact
              path="/subscriptions"
              render={AppProps => <SubscriptionsScene systemState={session} />}
            />
            <Route exact path="/tags/:tag" render={AppProps => <TagFeed />} />
            <Route exact path="*" component={NotFoundScene} status={404} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppState) => ({
  session: state.system
});

export default connect(mapStateToProps, { updateSession })(Router);
