import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export interface TransferListProps {
  allSubscriptions: string[],
  userSubscriptions: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    paper: {
      width: 200,
      height: 230,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }),
);

function not(a: string[], b: string[]) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]) {
  return a.filter(value => b.indexOf(value) !== -1);
}

const TransferList: React.FC<TransferListProps> = ({ allSubscriptions, userSubscriptions }) => {
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
    setAllSubs(allSubscriptions);
  }, [userSubscriptions, allSubscriptions]);

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
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {allSubscriptions.map((value: string) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
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
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(userSubs)}</Grid>
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
      <Grid item>{customList(allSubs)}</Grid>
    </Grid>
  );
}

export default TransferList;
