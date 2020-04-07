import React from "react";
import TagContainer from "./tag";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export interface ArticleBlockProps {
  title: string;
  uri: string;
  company: string;
  categories: string[];
  date: Date;
  article_id: string;
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({
  title,
  uri,
  company,
  categories,
  date,
  article_id,
}) => {
  const classes = useStyles();

  return (
    <div key={article_id} className="article">
      <span className="description">
        {company !== "" ? "By " + company + " on " : ""}
        {new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date)}
      </span>
      <div className="article-title">
        <a href={uri}>{title}</a>
      </div>
      {categories.map((tag: string) => (
        <TagContainer tagName={tag} key={tag} />
      ))}
    </div>
  );
};

export default ArticleBlock;
