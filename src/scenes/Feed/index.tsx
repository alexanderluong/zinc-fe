import React from "react";
import Feed from "./components";
import "./feed.css";
import FilterButton from "components/filter-button";
import Banner from "./components/banner";

export interface FeedSceneProps {
  loggedIn: boolean;
  firstName: string;
}

export const FeedScene: React.FC<FeedSceneProps> = ({
  loggedIn,
  firstName
}) => {
  return (
    <React.Fragment>
      <Banner loggedIn={loggedIn} firstName={firstName} />
      <div id="feed-container">
        <Feed />
        <FilterButton />
      </div>
    </React.Fragment>
  );
};
