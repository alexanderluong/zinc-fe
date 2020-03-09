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
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    bar: {
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(25,38,48,0))",
      boxShadow: "none",
      zIndex: 300
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

export interface NavBarProps {
  loggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ loggedIn }) => {
  const classes = useStyles();

  if (loggedIn) {
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
              to="/submit"
              color="inherit"
              className={classes.link}
            >
              Submit
            </Button>
            <Button
              component={Link}
              to="/subscriptions"
              color="inherit"
              className={classes.link}
            >
              <NotificationsActiveIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
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
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default NavBar;
