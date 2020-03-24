import React, { useState } from "react";
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
      margin: "auto"
    },
    button: {
      margin: theme.spacing(0.5, 0)
    }
  })
);

function not(a: string[], b: string[]) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]) {
  return a.filter(value => b.indexOf(value) !== -1);
}

const TransferList: React.FC<TransferListProps> = ({
  userToken,
  allSubscriptions,
  userSubscriptions
}) => {
  const classes = useStyles();
  const [userSubs, setUserSubs] = React.useState<string[]>(userSubscriptions);
  const [allSubs, setAllSubs] = React.useState<string[]>(allSubscriptions);
  const [checked, setChecked] = React.useState<string[]>([]);

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
    return listA.filter(word => listB.indexOf(word) === -1);
  };

  async function onSubscribe() {
    let res = await putUser(userToken, userSubs);

    if (res.ok) {
      console.log("yay");
    }
  }

  const handleAllRight = () => {
    setAllSubs(allSubs.concat(userSubs));
    setUserSubs([]);
  };

  const handleCheckedRight = () => {
    setAllSubs(allSubs.concat(leftChecked));
    setUserSubs(not(userSubs, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setUserSubs(userSubs.concat(rightChecked));
    setAllSubs(not(allSubs, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setUserSubs(userSubs.concat(allSubs));
    setAllSubs([]);
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
      <Grid item xs={12} justify="center" className="alert">
        <Alert severity="success">
          Your subscriptions have been updated succesfully.
        </Alert>
      </Grid>
      <br/>
      <Grid item>
        <h2>Your Subscriptions</h2>
        {customList(userSubs)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={userSubs.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={allSubs.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <h2>All Subscriptions</h2>
        {customList(allSubs)}
      </Grid>
      <Button variant="contained" onClick={onSubscribe}>
        Update
      </Button>
    </Grid>
  );
};

export default TransferList;
