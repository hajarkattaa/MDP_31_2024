import { generateCaseNumber, isFormValid } from './helpers';
import { describe, test, expect } from '@jest/globals';

describe('Utility Functions', () => {
  test('generateCaseNumber generates a case number correctly', () => {
    const patientInfo = { firstName: 'John', lastName: 'Doe' };
    const caseNumber = generateCaseNumber(patientInfo);
    expect(caseNumber).toMatch(/Doe-John-\d{8}/); // Matches "Doe-John-YYYYMMDD"
  });

  test('isFormValid returns true for valid input', () => {
    const patientInfo = { firstName: 'Jane', lastName: 'Smith', phoneNumber: '1234567890' };
    const acceptedFiles = [{}]; // At least one file uploaded
    expect(isFormValid(patientInfo, acceptedFiles)).toBe(true);
  });

  test('isFormValid returns false for invalid input', () => {
    const patientInfo = { firstName: '', lastName: '', phoneNumber: '' };
    const acceptedFiles = []; // No files uploaded
    expect(isFormValid(patientInfo, acceptedFiles)).toBe(false);
  });
});
