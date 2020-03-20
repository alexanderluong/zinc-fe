import React, { useState, useEffect, useLayoutEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./feed.css";

export interface FilterMenuProps {}

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  bar: {
    boxShadow: "none",
    zIndex: 30000,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  anchor: {
    position: "fixed",
    top: 50
  },
  menucontainer: {
    position: "relative"
  }
}));

const FilterMenu: React.FC<FilterMenuProps> = ({}) => {
  const classes = useStyles();
  const categories: string[] = ["risk", "robotics", "business", "finance"];

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorClass, setMenuAnchorClass] = useState("");

  const checkPositionToAnchor = (e: any) => {
    let position = document
      .getElementById("filter-menu-div")!
      .getBoundingClientRect();
    if (position.y < 50) {
      console.log("hit top: " + position.y);
      setMenuAnchorClass(classes.anchor);
    } else if (position.y >= 50) {
      setMenuAnchorClass("");
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Anchor filter menu to top
  useLayoutEffect(() => {
    window.addEventListener("scroll", checkPositionToAnchor);

    return () => window.removeEventListener("scroll", checkPositionToAnchor);
  }, []);

  return (
    <React.Fragment>
      <div id="filter-menu-div" className={classes.menucontainer}>
        <AppBar className={classes.bar + " " + menuAnchorClass}>
          <Toolbar id="tool-bar-container">
            {categories.map((tag: string) => (
              <Button
                component={Link}
                to={"/tags/" + tag}
                color="inherit"
                key={tag}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Button>
            ))}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Companies
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Galvanize</MenuItem>
              <MenuItem onClick={handleClose}>Hootsuite</MenuItem>
              <MenuItem onClick={handleClose}>Visier</MenuItem>
            </Menu>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default FilterMenu;
