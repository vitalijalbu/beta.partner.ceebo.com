import instance from '../services/api';

export const getNewOrders = (query = '') => (dispatch) => {
  return instance.get(`/merchant/orders/draft?${query}`).then(({ data }) => {
    return dispatch({ type: 'ORDERS_LOADED', payload: data });
  });
};

export const getPulseOrders = () => {
  return instance.get('/merchant/orders/pulse');
};


/* Get all new orders */
export const getDraftOrders = (query) => {
  return instance.get(`/merchant/orders/draft`, { query });
};

export const getAllOrders = (params) => {
  return instance.get(`/merchant/orders`, { params });
};

export const getOrdersMap = () => {
  return instance.get(`/merchant/orders/map`);
};

export const getOrdersAreas = (query) => {
  return instance.get(`/merchant/orders/areas`, { query });
};

export const viewAreaOrders = (id) => {
  return instance.get(`/merchant/orders/areas/${id}`);
};

export const getOrder = (id) => {
  return instance.get(`/merchant/orders/${id}`);
};
export const createOrder = (body) => (dispatch) => {
  return instance.post(`/merchant/orders/create`, body).then((res) => {
    //dispatch(getNewOrders());
    return res;
  });
};

export const assignOrder = (body) => {
  return instance.post(`/merchant/orders/assign`, body);
};

export const acceptOrder = (body) => {
  return instance.post(`/merchant/orders/accept`, body);
};

export const rejectOrder = (body) => {
  return instance.post(`/merchant/orders/reject`, body);
};

export const withdrawOrder = (body) => {
  return instance.post(`/merchant/orders/withdraw`, body);
};
