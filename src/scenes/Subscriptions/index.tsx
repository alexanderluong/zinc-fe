import React from "react";
import Subscriptions from "./components/";
import { SystemState } from "store/system/types";

export interface SubscriptionsSceneProps {
  systemState: SystemState;
}

export const SubscriptionsScene: React.FC<SubscriptionsSceneProps> = ({
  systemState
}) => {
  return <Subscriptions systemState={systemState} />;
};
