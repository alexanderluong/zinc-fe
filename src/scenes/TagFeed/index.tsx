import React from "react";
import Feed from "components/feed";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

export interface TagFeedProps {}

const useStyles = makeStyles(theme => ({
  feedcontainer: {
    boxShadow: "none",
    top: 50,
    position: "relative"
  }
}));

export const TagFeed: React.FC<TagFeedProps> = ({}) => {
  var tag: string | undefined = undefined;
  var company: string | undefined = undefined;
  var search: string | undefined = undefined;

  let param_tag: any = useParams();
  tag = param_tag.tag;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.feedcontainer}>
        <Feed tag={tag} company={company} search={search} />
      </div>
    </React.Fragment>
  );
};
