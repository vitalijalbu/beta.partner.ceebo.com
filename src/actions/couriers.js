import instance from '../services/api';

export const getAllCouriers = () => {
  return instance.get(`/merchant/couriers`);
};

export const getCourier = (id) => {
  return instance.get(`/merchant/couriers/${id}`);
};

export const createCourier = (body) => {
  return instance.post(`/merchant/couriers/create`, body);
};

export const updateCourier = (body) => {
  return instance.put(`/merchant/couriers/update`, body);
};
export const resendConfirmation = (body) => {
  return instance.post(`/merchant/couriers/activate`, body);
};

export const deleteCourier = (id) => {
  return instance.put('/merchant/couriers/delete', {
    courier_id: id,
  });
};

export const getCourierOrders = (id) => {
  return instance.get(`/merchant/couriers/${id}/orders`);
};

export const getDeposits = (id) => {
  return instance.get(`/merchant/couriers/${id}/deposits`);
};

export const registerDeposit = (id, body) => {
  return instance.put(`/merchant/couriers/deposits/register`, body);
};

export const deleteDeposit = (body) => {
  return instance.post(`/merchant/couriers/deposits/delete`, body);
};

export const updateDeposit = (body) => {
  return instance.put(`/merchant/couriers/deposits/update`, body);
};

export const createDeposit = (body) => {
  return instance.post(`/merchant/couriers/deposits/create`, body);
};
