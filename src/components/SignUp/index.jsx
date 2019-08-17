import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../constants/routes';
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withStyles(styles)(SignUpPage);
export { SignUpLink };
