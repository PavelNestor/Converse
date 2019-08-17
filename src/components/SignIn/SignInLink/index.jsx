import React from 'react';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../../constants/routes';

import styles from './styles';

const SignInLink = ({ classes }) => (
  <Typography  className={classes.hasAccountHeader} component="h5" variant="h6">
    Already Have An Account? <Link  className={classes.logInLink} to={ROUTES.SIGN_IN}>Sign In</Link>
  </Typography>
);

export default  withStyles(styles)(SignInLink);
