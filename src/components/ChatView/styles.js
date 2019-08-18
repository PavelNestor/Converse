const styles = theme => ({
  content: {
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    padding: '25px',
    marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: 120,
    width: 'calc(100% - 300px)',
    position: 'absolute'
  },

  userSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#707BC4',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },
  
  friendSent: {
    float: 'right',
    clear: 'both',
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: theme.spacing(),
    backgroundColor: '#707BC4',
    color: 'white',
    width: 300,
    borderRadius: 10,
  },

  chatHeader: {
    width: 'calc(100% - 301px)',
    height: 50,
    backgroundColor: '#344195',
    position: 'fixed',
    marginLeft: 301,
    fontSize: '1rem',
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
    boxSizing: 'border-box',
  }
});

export default styles;
