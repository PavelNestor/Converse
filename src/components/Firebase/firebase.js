import firebase from 'firebase/firebase';
import 'firebase/auth';
import 'firebase/database'; //TODO change to firestore
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.emailAuthProvider = firebase.auth.EmailAuthProvider;
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.firestore = firebase.firestore();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider)

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.fsUser(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API *** TODO - remove realtime database
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  // *** User API ***
  fsUser = uid => this.firestore.collection(`users`).doc(uid);
  fsUsers = () => this.firestore.collection('users');
}
export default Firebase;