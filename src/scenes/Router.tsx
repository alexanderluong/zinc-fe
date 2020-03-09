import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { LoginScene } from "./Login";
import { FeedScene } from "./Feed";
import { NotFoundScene } from "./NotFound";
import { SubmitPostScene } from "./SubmitPost";
import { SignUpScene } from "./SignUp";
import NavBar from "../components/navbar";
import { updateSession } from "store/system/actions";
import { SystemState } from "store/system/types";
import { connect } from "react-redux";
import { AppState } from "store";

interface AppProps {
  updateSession: typeof updateSession;
  session: SystemState;
}

class Router extends React.Component<AppProps> {
  updateSession = (newSession: SystemState) => {
    this.props.updateSession(newSession);
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div id="navbar-bg"></div>
          <NavBar
            loggedIn={this.props.session.loggedIn}
            updateSession={this.updateSession}
          />
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={AppProps => (
                  <FeedScene
                    loggedIn={this.props.session.loggedIn}
                    firstName={this.props.session.firstName}
                  />
                )}
              />
              <Route
                exact
                path="/login"
                render={AppProps => (
                  <LoginScene
                    updateSession={this.updateSession}
                    loggedIn={this.props.session.loggedIn}
                  />
                )}
              />
              <Route
                exact
                path="/feed"
                render={AppProps => (
                  <FeedScene
                    loggedIn={this.props.session.loggedIn}
                    firstName={this.props.session.firstName}
                  />
                )}
              />
              <Route
                exact
                path="/submit"
                render={AppProps => (
                  <SubmitPostScene loggedIn={this.props.session.loggedIn} />
                )}
              />
              <Route exact path="/signup" component={SignUpScene} />
              <Route exact path="*" component={NotFoundScene} status={404} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  session: state.system
});

export default connect(mapStateToProps, { updateSession })(Router);
