import React from "react";
import "./tag.css";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import HtmlTooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { ADMIN_EMAIL } from "../config";

export interface ContactPopupProps {}

export interface ContactPopupState {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      float: "right",
      position: "fixed",
      bottom: "40px",
      right: "40px",
    },
    popup: { zIndex: 9999999 },
  })
);

const ContactPopup: React.FC<ContactPopupProps> = ({}) => {
  const classes = useStyles();
  let email_link = `mailto:${ADMIN_EMAIL}`;

  return (
    <div className={classes.popup}>
      <a className={classes.popup} href={email_link}>
        <HtmlTooltip
          placement="left"
          arrow
          className={classes.popup}
          title={
            <React.Fragment>
              <Typography color="inherit">Need some help?</Typography>
              Contact an admin.
            </React.Fragment>
          }
        >
          <IconButton
            aria-label="contact"
            className={classes.icon}
            size="medium"
          >
            <MailIcon />
          </IconButton>
        </HtmlTooltip>
      </a>
    </div>
  );
};

export default ContactPopup;
