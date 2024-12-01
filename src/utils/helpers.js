// utils/helpers.js
import STATUSES from '../constants/statuses';

export const getColorForResult = (result) =>
  result === STATUSES.REJECTED ? 'error' : result === STATUSES.ACCEPTED ? 'success' : 'warning';

export const generateCaseNumber = (patientInfo) => {
  const { firstName, lastName } = patientInfo;
  return `${lastName.replace(/\s/g, '')}-${firstName.replace(/\s/g, '')}-${new Date()
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '')}`;
};

export const isFormValid = (patientInfo, acceptedFiles) => {
  const { firstName, lastName, phoneNumber } = patientInfo;
  return firstName && lastName && phoneNumber && acceptedFiles.length > 0;
};
