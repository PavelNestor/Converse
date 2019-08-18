import React from 'react';

import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import SignUpForm from './SignUpForm';

import styles from './styles';

const SignUpPage = ({ classes }) => {
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'>Sign Up</Typography>
        <SignUpForm />
      </Paper>
    </main>
  );
};

export default withStyles(styles)(SignUpPage);
