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

export const TagFeed: React.FC<TagFeedProps> = ({}) => {
  const [tag, setTag] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [search, setSearch] = useState(undefined);

  const RefreshParams = (event: any) => {
    var param_tag: any = useParams();
    setTag(param_tag);
  };

  useEffect(() => {
    console.log("componentDidMount");
    document.addEventListener("popstate", RefreshParams);
    return () => {
      console.log("componentWillUnmount");
      document.removeEventListener("popstate", RefreshParams);
    };
  }, []); // empty-array means don't watch for any updates

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.feedcontainer}>
        <Feed tag={tag} company={company} search={search} />
      </div>
    </React.Fragment>
  );
};
