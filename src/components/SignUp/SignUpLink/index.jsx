import React from 'react';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../../constants/routes';

import styles from './styles';

const SignUpLink = ({ classes }) => (
  <Typography  className={classes.hasAccountHeader} component="h5" variant="h6">
    Don't have an account? <Link  className={classes.signUpLink} to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Typography>
);

export default  withStyles(styles)(SignUpLink);
