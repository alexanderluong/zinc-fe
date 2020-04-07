import React from "react";
import "./tag.css";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import HtmlTooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

export interface ContactPopupProps {}

export interface ContactPopupState {}

const useStyles = makeStyles((theme) => ({
  icon: {
    float: "right",
    position: "fixed",
    bottom: "40px",
    right: "40px",
  },
}));

const ContactPopup: React.FC<ContactPopupProps> = ({}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <HtmlTooltip
        placement="left"
        arrow
        title={
          <React.Fragment>
            <Typography color="inherit">Need some help?</Typography>
            Contact an admin.
          </React.Fragment>
        }
      >
        <a href="mailto:hello@world.io">
          <IconButton
            aria-label="contact"
            className={classes.icon}
            size="medium"
          >
            <MailIcon />
          </IconButton>
        </a>
      </HtmlTooltip>
    </React.Fragment>
  );
};

export default ContactPopup;
