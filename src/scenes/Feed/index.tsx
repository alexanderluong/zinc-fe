import React from "react";
import Feed from "./components";
import "./feed.css";
import FilterButton from "components/filter-button";
import Banner from "./components/banner";

export const FeedScene: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Banner />
      <div id="feed-container">
        <Feed />
        <FilterButton />
      </div>
    </React.Fragment>
  );
};
