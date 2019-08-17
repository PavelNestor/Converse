import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import styles from './styles';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmitLogin = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error } = this.state;
    const { classes } = this.props;

    return (
      <>
        <form className={classes.form} onSubmit={this.onSubmitLogin}>
          <FormControl required fullWidth>
            <InputLabel htmlFor="signin-email-input">Enter Your Email</InputLabel>
            <Input
              autoComplete="email"
              id="signin-email-input"
              name="email"
              onChange={this.onChange}
            />
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel htmlFor="signin-password-input">Enter Your Password</InputLabel>
            <Input
              id="signin-password-input"
              name="password"
              onChange={this.onChange}
              type="password"
            />
          </FormControl>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </form>

        {error && (
          <Typography component="h5" variant="h6" className={classes.errorText}>
            {error.message}
          </Typography>
        )}
      </>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default withStyles(styles)(SignInForm);
