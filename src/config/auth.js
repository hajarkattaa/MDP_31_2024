import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in using an email and password.
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  if (result.user) {
    console.log('Successfully logged in with google');
  } else {
    console.log('Failed to log in with google');
  }

  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
