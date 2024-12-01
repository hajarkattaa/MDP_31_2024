// services/firebaseService.js
import * as DB from 'firebase/database';
import * as Storage from 'firebase/storage';

export const uploadImage = async (storageRef, imageFile) => {
  await Storage.uploadBytes(storageRef, imageFile);
};

export const saveCaseData = async (dbRef, caseKey, caseData) => {
  await DB.set(DB.child(dbRef, caseKey), caseData);
};

export const deleteStorageObject = async (storageRef) => {
  await Storage.deleteObject(storageRef);
};
