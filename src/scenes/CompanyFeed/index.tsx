import React, { useEffect, useState } from "react";
import Feed from "components/feed";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export interface CompanyFeedProps {
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
  company: string;
}

export const CompanyFeed: React.FC<CompanyFeedProps> = ({}) => {
  console.log(useParams<ParamTypes>());
  const { company } = useParams<ParamTypes>();
  const [feed_tag, setTag] = useState(undefined);
  const [company_params, setCompany] = useState(company);
  const [search, setSearch] = useState(undefined);

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.feedcontainer}>
        <Feed tag={feed_tag} company={company_params} search={search} />
      </div>
    </React.Fragment>
  );
};
