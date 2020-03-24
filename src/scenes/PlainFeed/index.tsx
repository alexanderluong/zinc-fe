import React, { useEffect, useState } from "react";
import Feed from "components/feed";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export interface PlainFeedProps {
  params: any;
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

export const PlainFeed: React.FC<PlainFeedProps> = ({ params }) => {
  const [feed_tag, setTag] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [search, setSearch] = useState(undefined);

  const classes = useStyles();

  const queryString = require("query-string");
  console.log(params);
  let parsedParams = queryString.parse(params);

  let categories =
    parsedParams.categories !== undefined
      ? parsedParams.categories.split(",")
      : [];
  let companies =
    parsedParams.companies !== undefined
      ? parsedParams.companies.split(",")
      : [];

  console.log(categories);
  console.log(companies);

  return (
    <React.Fragment>
      <div className={classes.feedcontainer}>
        <Feed tags={categories} companies={companies} search={search} />
      </div>
    </React.Fragment>
  );
};
