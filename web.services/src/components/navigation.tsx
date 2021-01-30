import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Link } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: 48,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item>
            <Link component="a" color="inherit" href="/" variant="button">
              Sign in
            </Link>
          </Grid>
          <Grid item>
            <Link
              component="a"
              color="inherit"
              href="/contracts"
              variant="button"
            >
              Contracts
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
