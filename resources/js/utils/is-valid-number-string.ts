import _ from 'lodash';

const isValidNumberString = (value: string): boolean => {
  return _.isFinite(Number(value));
};

export default isValidNumberString;
