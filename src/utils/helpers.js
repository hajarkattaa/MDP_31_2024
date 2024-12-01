// utils/helpers.js
import STATUSES from '../constants/statuses';

export const getColorForResult = (result) =>
  result === STATUSES.REJECTED ? 'error' : result === STATUSES.ACCEPTED ? 'success' : 'warning';
