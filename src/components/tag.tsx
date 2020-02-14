import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import "./tag.css";

export interface TagContainerProps {
  tagName: string;
}

export interface TagContainerState {}

class TagContainer extends React.Component<
  TagContainerProps,
  TagContainerState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      tagName: ""
    };
  }

  render() {
    return (
      <a href="/tags/{this.props.tagName}">
        <span className="tag">#{this.props.tagName}</span>
      </a>
    );
  }
}

export default TagContainer;
