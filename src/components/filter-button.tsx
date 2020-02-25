import React from "react";
import { Theme, Fab, createStyles, withStyles } from "@material-ui/core";

export interface FilterButtonProps {
  classes: any;
}

export interface FilterButtonState {}

let styles = (theme: Theme) =>
  createStyles({
    button: {
      color: "#fff",
      boxShadow: "none",
      background: "rgb(89,96,109,0.3)"
    },
    container: {
      position: "fixed",
      bottom: 30,
      right: 30
    }
  });

const DecoratedFilterButton = withStyles(styles)(
  class FilterButton extends React.Component<
    FilterButtonProps,
    FilterButtonState
  > {
    render() {
      return (
        <div className={this.props.classes.container} id="filter-container">
          <Fab
            size="medium"
            variant="extended"
            className={`${this.props.classes.button} filter-button`}
          >
            Filter Articles
          </Fab>
        </div>
      );
    }
  }
);

export default DecoratedFilterButton;
