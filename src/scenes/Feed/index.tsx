import React from "react";
import Feed from "./components";
import "./feed.css";
import FilterButton from "components/filter-button";

export const FeedScene: React.FC<{}> = () => {
  return (
    <div className="container">
      <Feed />
      <FilterButton />
    </div>
  );
};
