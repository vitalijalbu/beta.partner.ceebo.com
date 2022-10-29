import instance from '../services/api';

export const getInteractions = () => {
  return instance.get(`/merchant/help/interactions`);
};
