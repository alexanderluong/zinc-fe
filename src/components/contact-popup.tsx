import React from "react";
import "./tag.css";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import HtmlTooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { ADMIN_EMAIL, RSS_FEED_LINK } from "../config";

export interface ContactPopupProps {}

export interface ContactPopupState {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: { position: "relative", margin: "2px", display: "block" },
    popup: { zIndex: 9999999 },
    popup_container: {
      display: "block",
      position: "fixed",
      bottom: "40px",
      right: "40px",
      zIndex: 9999999,
    },
  })
);

const ContactPopup: React.FC<ContactPopupProps> = ({}) => {
  const classes = useStyles();
  let email_link = `mailto:${ADMIN_EMAIL}`;

  return (
    <div className={classes.popup_container}>
      <div className={classes.popup}>
        <a className={classes.popup} href={`${RSS_FEED_LINK}`}>
          <HtmlTooltip
            placement="left"
            arrow
            className={classes.popup}
            title={
              <React.Fragment>
                <Typography color="inherit">Use a RSS feed reader?</Typography>
              </React.Fragment>
            }
          >
            <IconButton
              aria-label="contact"
              className={classes.icon}
              size="medium"
            >
              <RssFeedIcon />
            </IconButton>
          </HtmlTooltip>

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
    </div>
  );
};

export default ContactPopup;
