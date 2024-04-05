import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (email, password, { firstName, lastName }) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    // Add the user's first and last name to their profile
    (userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
    },
  );
};

// Sign in using an email and password.
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};
