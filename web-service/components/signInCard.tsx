import { Container, CssBaseline, makeStyles, Paper } from '@material-ui/core';

import React from 'react';
import { SignIn } from './SignIn/signIn';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(0),
    justifyContent: 'space-between',
    borderWidth: 0,
    borderTopWidth: theme.spacing(1),
    borderColor: theme.palette.primary.main,
    borderStyle: 'solid',
  },
}));

export const SignInCard = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.root}>
        <SignIn />
      </Paper>
    </Container>
  );
};
