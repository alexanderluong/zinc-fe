import * as React from "react";
import LoginForm from "./components/LoginForm";
import { SystemState } from "store/system/types";

export interface LoginSceneProps {
  updateSession: (newSession: SystemState) => void;
  loggedIn: boolean;
}

export const LoginScene: React.FC<LoginSceneProps> = ({
  updateSession,
  loggedIn
}) => {
  return <LoginForm updateSession={updateSession} loggedIn={loggedIn} />;
};
