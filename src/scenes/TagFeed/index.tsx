import React, { useEffect, useState } from "react";
import Feed from "components/feed";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export interface TagFeedProps {
  key: any;
}

const useStyles = makeStyles(theme => ({
  feedcontainer: {
    boxShadow: "none",
    top: 50,
    position: "relative"
  }
}));

interface ParamTypes {
  tag: string;
}

export const TagFeed: React.FC<TagFeedProps> = ({ key }) => {
  console.log(useParams<ParamTypes>());
  const { tag } = useParams<ParamTypes>();
  const [feed_tag, setTag] = useState(tag);
  const [company, setCompany] = useState(undefined);
  const [search, setSearch] = useState(undefined);

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.feedcontainer}>
        <Feed tag={feed_tag} company={company} search={search} />
      </div>
    </React.Fragment>
  );
};
