import React from "react";
import "./tag.css";

export interface TagContainerProps {
  tagName: string;
}

export interface TagContainerState {}

class TagContainer extends React.Component<
  TagContainerProps,
  TagContainerState
> {
  render() {
    const path: string = "/tags/" + this.props.tagName;
    return (
      <React.Fragment>
        <a href={path}>
          <span className="tag">{this.props.tagName}</span>
        </a>
      </React.Fragment>
    );
  }
}

export default TagContainer;
