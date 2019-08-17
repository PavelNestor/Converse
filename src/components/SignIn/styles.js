const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  hasAccountHeader: {
    width: '100%',
  },
  logInLink: {
    width: '100%',
    textDecoration: 'none',
    color: '#303f9f',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  test: console.log('theme.spacing()', theme.spacing())
});


export default styles;
