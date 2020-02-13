import React from "react";
import { Link } from "react-router-dom";
import { Router } from "../scenes/Router";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      "&:hover": {
        color: "#FFF"
      }
    },
    link: {
      "&:hover": {
        color: "#FFF"
      }
    }
  })
);

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            Hello Vancouver
          </Typography>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            className={classes.link}
          >
            Login / Sign Up
          </Button>
          <Button
            component={Link}
            to="/submit"
            color="inherit"
            className={classes.link}
          >
            Submit
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
