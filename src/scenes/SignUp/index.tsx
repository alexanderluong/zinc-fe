import React from "react";
import SignUpForm from "./components/";
import { SystemState } from "store/system/types";

export interface SignUpSceneProps {
  updateSession: (newSession: SystemState) => void;
  loggedIn: boolean;
}

export const SignUpScene: React.FC<SignUpSceneProps> = ({
  updateSession,
  loggedIn
}) => {
  return <SignUpForm updateSession={updateSession} loggedIn={loggedIn} />;
};
