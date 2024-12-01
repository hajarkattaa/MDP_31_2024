import { uploadImage, saveCaseData, deleteStorageObject } from './firebaseService';
import * as Storage from 'firebase/storage';
import * as DB from 'firebase/database';
import { describe, test, expect, jest } from '@jest/globals';

jest.mock('firebase/storage');
jest.mock('firebase/database');

describe('Firebase Services', () => {
  test('uploadImage uploads a file to storage', async () => {
    const ref = 'test-ref';
    const file = new Blob(['file content']);
    Storage.uploadBytes.mockResolvedValueOnce();

    await uploadImage(ref, file);
    expect(Storage.uploadBytes).toHaveBeenCalledWith(ref, file);
  });

  test('saveCaseData saves data to the database', async () => {
    const ref = 'test-db-ref';
    const data = { id: 1, name: 'Test' };
    DB.set.mockResolvedValueOnce();

    await saveCaseData(ref, 'test-case-key', data);
    expect(DB.set).toHaveBeenCalledWith(DB.child(ref, 'test-case-key'), data);
  });

  test('deleteStorageObject deletes an object from storage', async () => {
    const ref = 'test-storage-ref';
    Storage.deleteObject.mockResolvedValueOnce();

    await deleteStorageObject(ref);
    expect(Storage.deleteObject).toHaveBeenCalledWith(ref);
  });
});
