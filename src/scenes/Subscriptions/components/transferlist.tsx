import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { putUser } from "services/users/api";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import "../subscriptions.css";

export interface TransferListProps {
  userToken: string;
  allSubscriptions: string[];
  userSubscriptions: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
    },
    button: {
      margin: theme.spacing(0.5, 0),
      backgroundColor: "#d4d4d4",
    },
  })
);

function not(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList: React.FC<TransferListProps> = ({
  userToken,
  allSubscriptions,
  userSubscriptions,
}) => {
  const classes = useStyles();
  const [userSubs, setUserSubs] = React.useState<string[]>(
    userSubscriptions.sort()
  );
  const [allSubs, setAllSubs] = React.useState<string[]>(
    allSubscriptions.sort()
  );
  const [checked, setChecked] = React.useState<string[]>([]);
  const [alert, setAlert] = React.useState<any>();

  const leftChecked = intersection(checked, userSubs);
  const rightChecked = intersection(checked, allSubs);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  React.useEffect(() => {
    setUserSubs(userSubscriptions);
    let filteredAllSubs: string[] = filterWords(
      allSubscriptions,
      userSubscriptions
    );
    setAllSubs(filteredAllSubs);
  }, [userSubscriptions, allSubscriptions]);

  // Return list A - list B
  const filterWords = (listA: string[], listB: string[]) => {
    return listA.filter((word) => listB.indexOf(word) === -1);
  };

  async function onSubscribe() {
    let res = await putUser(userToken, userSubs);

    if (res.ok) {
      setAlert(successAlert());
    } else {
      setAlert(failureAlert());
    }
  }

  function hideElement(id: string) {
    let element = document.getElementById(id);
    if (element != null) element.style.display = "none";
  }

  function successAlert() {
    return (
      <Alert
        severity="success"
        id="success-alert"
        onClose={() => hideElement("success-alert")}
      >
        Your subscriptions have been updated succesfully.
      </Alert>
    );
  }

  function failureAlert() {
    return (
      <Alert
        severity="error"
        id="error-alert"
        onClose={() => hideElement("error-alert")}
      >
        An error has occurred. Your subscriptions were not updated succesfully.
      </Alert>
    );
  }

  const handleAllRight = () => {
    setAllSubs(allSubs.concat(userSubs).sort());
    setUserSubs([]);
    setChecked([]);
  };

  const handleCheckedRight = () => {
    setAllSubs(allSubs.concat(leftChecked).sort());
    setUserSubs(not(userSubs, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setUserSubs(userSubs.concat(rightChecked).sort());
    setAllSubs(not(allSubs, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setUserSubs(userSubs.concat(allSubs).sort());
    setAllSubs([]);
    setChecked([]);
  };

  const customList = (allSubscriptions: string[]) => (
    <Paper variant="outlined" className="transferlist-paper">
      <List dense component="div" role="list">
        {allSubscriptions.map((value: string) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid item md={3} sm={2} xs="auto" className="alert"></Grid>
      <Grid item md={6} sm={8} xs={12} className="alert">
        {alert}
      </Grid>
      <Grid item md={3} sm={2} xs="auto" className="alert"></Grid>
      <br />
      <Grid item>
        <h2>All Categories</h2>
        {customList(allSubs)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={allSubs.length === 0}
            aria-label="move all right"
          >
            <p className="arrow-text">≫</p>
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected right"
          >
            <p className="arrow-text">&gt;</p>
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected left"
          >
            <p className="arrow-text">&lt;</p>
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={userSubs.length === 0}
            aria-label="move all left"
          >
            <p className="arrow-text">≪</p>
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <h2>You're currently subscribed to...</h2>
        {customList(userSubs)}
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={onSubscribe}
      >
        <p className="button-text">Update</p>
      </Button>
    </Grid>
  );
};

export default TransferList;
