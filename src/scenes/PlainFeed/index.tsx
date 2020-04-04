import React, { useEffect, useState } from "react";
import Feed from "components/feed";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export interface PlainFeedProps {
  params: any;
  key: any;
}

const useStyles = makeStyles((theme) => ({
  feedcontainer: {
    boxShadow: "none",
    top: 50,
    position: "relative",
  },
}));

interface ParamTypes {
  tag: string;
}

function getQueryVariable(variable: string) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  //console.log("Query variable %s not found", variable);
}

export const PlainFeed: React.FC<PlainFeedProps> = ({ params }) => {
  const [feed_tag, setTag] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [search, setSearch] = useState(undefined);

  const classes = useStyles();

  let paramsCategories = getQueryVariable("categories");
  let paramsCompanies = getQueryVariable("companies");

  let categories =
    paramsCategories !== undefined ? paramsCategories.split(",") : [];
  let companies =
    paramsCompanies !== undefined ? paramsCompanies.split(",") : [];

  return (
    <React.Fragment>
      <div className={classes.feedcontainer}>
        <Feed tags={categories} companies={companies} search={search} />
      </div>
    </React.Fragment>
  );
};
