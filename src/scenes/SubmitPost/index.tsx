import React from "react";
import SubmitForm from "./components";

export interface SubmitPostSceneProps {
  loggedIn: boolean;
  sessionToken: string;
}

export const SubmitPostScene: React.FC<SubmitPostSceneProps> = ({
  loggedIn,
  sessionToken,
}) => {
  return <SubmitForm loggedIn={loggedIn} sessionToken={sessionToken} />;
};
