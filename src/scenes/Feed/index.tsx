import React from "react";
import Feed from "./components";
import "./feed.css";

export const FeedScene: React.FC<{}> = () => {
  return (
    <div className="container">
      <Feed />
    </div>
  );
};
