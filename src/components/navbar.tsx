import React from "react";
import { Link } from "react-router-dom";
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
    bar: {
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(25,38,48,0))",
      boxShadow: "none",
      zIndex: 100
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      "&:hover": {
        color: "#FFF"
      },
      fontFamily: '"Playfair Display", sans-serif',
      fontWeight: 700
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
      <AppBar className={classes.bar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <span className="emphasis taj-font" style={{ fontSize: "20px" }}>
              &lt;&nbsp;
            </span>
            <span className="main-site-title">Vancity Tech</span>
            <span className="emphasis taj-font" style={{ fontSize: "20px" }}>
              {" "}
              /&gt;
            </span>
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
