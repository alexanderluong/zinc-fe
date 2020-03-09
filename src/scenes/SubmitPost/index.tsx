import React from "react";
import SubmitForm from "./components";

export interface SubmitPostSceneProps {
  loggedIn: boolean;
}

export const SubmitPostScene: React.FC<SubmitPostSceneProps> = ({
  loggedIn
}) => {
  return <SubmitForm loggedIn={loggedIn} />;
};
