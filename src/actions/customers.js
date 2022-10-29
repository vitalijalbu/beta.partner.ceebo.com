import instance from '../services/api';

export const getAllCustomers = (query) => {
  if(!query) {
    return instance.get(`/merchant/customers`);
  } else{
    return instance.get(`/merchant/customers/search?query=${query}`);
  }
};


export const addressSearch = (query) => {
  if(!query) {
    return instance.get(`/explore/autocomplete?`);
  } else{
    return instance.get(`/explore/autocomplete?query=${query}`);
  }
};

export const getCustomer = (id) => {
  return instance.get(`/merchant/customers/${id}`);
};

export const getCustomerAddresses = (id) => {
  return instance.get(`/merchant/customers/${id}/addresses`);
};

export const createCustomer = (body) => {
  return instance.post(`/merchant/customers/create`, body);
};

export const addCustomerAddress = (body) => {
  return instance.post(`/merchant/customers/addresses/create`, body);
};
export const deleteCustomerAddress = (body) => {
  return instance.post(`/merchant/customers/addresses/delete`, body);
};

export const updateCustomer = (body) => {
  return instance.put(`/merchant/customers/update`, body);
};

export const deleteCustomer = (body) => {
  return instance.put('/merchant/customers/delete', body);
};
