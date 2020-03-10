import React from "react";
import Feed from "components/feed";
import { useParams } from "react-router";

export interface TagFeedProps {}

export const TagFeed: React.FC<TagFeedProps> = ({}) => {
  var tags: string[] = [];
  var company: string = "";
  var search: string = "";

  let { tag } = useParams();
  if (tag) tags.push(tag);

  return (
    <React.Fragment>
      <Feed tags={tags} company={company} search={search} />
    </React.Fragment>
  );
};
