import instance from '../services/api';

export const getSummary = () => {
  return instance.get(`/merchant/reports`);
};

export const getReviews = () => {
  return instance.get(`/merchant/reports/reviews`);
};

export const getReport = (params) => {
  return instance.get(`/merchant/reports/sales`, { params });
};
export const getItemSalesReport = (params) => {
  return instance.get(`/merchant/reports/items`, { params });
};
