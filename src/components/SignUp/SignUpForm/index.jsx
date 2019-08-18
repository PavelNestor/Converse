import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withFirebase } from '../../firebase';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import * as constant from '../../../constants/constant';
import SignInLink from './../../SignIn/SignInLink';

import styles from './styles';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { username, email, passwordOne, isAdmin } = this.state;

    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      // .then(authUser => {
      //   return this.props.firebase.user(authUser.user.uid).set({
      //     username,
      //     email,
      //     roles
      //   });
      // })
      .then(authUser => {
        console.log('authUser', authUser);
        
        return this.props.firebase.fsUser(authUser.user.email).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === constant.ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = constant.ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, isAdmin, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
    const { classes } = this.props;

    return (
      <>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl required fullWidth>
            <InputLabel htmlFor="signup-name-input">Enter Your Name</InputLabel>
            <Input
              autoComplete="Name"
              autoFocus
              id="signup-name-input"
              name="username"
              onChange={this.onChange}
            />
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel htmlFor="signup-email-input">Enter Your Email</InputLabel>
            <Input
              autoComplete="email"
              id="signup-email-input"
              name="email"
              onChange={this.onChange}
            />
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel htmlFor="signup-password-input">Enter Your Password</InputLabel>
            <Input
              id="signup-password-input"
              name="passwordOne"
              onChange={this.onChange}
              type="password"
            />
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel htmlFor="signup-password-confirm-input">Confirm Your Password</InputLabel>
            <Input
              id="signup-password-confirm-input"
              name="passwordTwo"
              onChange={this.onChange}
              type="password"
            />
          </FormControl>
          {/* Create Admin */}
          {/* <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label> */}
          <Button
            className={classes.submit}
            color="primary"
            disabled={isInvalid}
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
        </form>

        {error && (
          <Typography component="h5" variant="h6" className={classes.errorText}>
            {error.message}
          </Typography>
        )}

        <SignInLink />
      </>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default withStyles(styles)(SignUpForm);
