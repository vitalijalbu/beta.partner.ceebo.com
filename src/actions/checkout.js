import instance from '../services/api';
import { isObject } from '../services/helpers';
import { f7, useStore } from 'framework7-react';


export const getCartOLD = (newParams) => (dispatch, getState) => {
  const params = { ...Cart.params, ...newParams, manually: true };
  if (!Cart.loading) {
    dispatch({ type: 'CART_LOADING', payload: params });
  }
  return instance
    .get(`/cart_session/items`, { params })
    .then(({ data }) => {
      dispatch({ type: 'CART_LOADED', payload: isObject(data) ? data : {} });
    })
    .catch(() => {
      dispatch({ type: 'CART_ERROR' });
    });
};

export const getCart = (query) => {
  //console.log("🌿 cart-api-query", f7.utils.serializeObject(query))
  //const params = { ...Cart.params, ...newParams };
  return instance.get(`/cart_session/items?${f7.utils.serializeObject(query)}`);
};

export const addToCart2 = (params) => (dispatch) => {
  return instance
    .post(`/cart_session/add`, params)
    .then(({ data }) => {
      dispatch(getAllCart());
      return data;
    })
    .catch((err) => {
      console.log(err);

      // toast.error(err.message);
    });
};

export const deleteCartItem = (body) => (dispatch) => {
  return instance.delete(`/cart_session/delete`, { data: body }).then(() => {
    dispatch(getAllCart());
  });
};

export const updateQty = (body) => {
  return instance.post(`/cart_session/update_qty`, body).then(() => {
    f7.store.dispatch('loadCart');
  });
};


export const addItemCart = (body) => {
  return instance.post('/cart_session/add', body);
};

export const incrementQty = (body) => {
  return instance.post('/cart_session/increment', body);
};

export const decrementQty = (body) => {
  return instance.post('/cart_session/decrement', body);
};

export const clearCart = (body) => {
  return instance.post('/cart_session/clear', body);
};


export const checkDistanceArea = (params) => {
  return instance.post(`/cart_session/check_address?${f7.utils.serializeObject(params)}`);
};

export const checkOut = (body) => {
  return instance.post('/cart_session/checkout', body);
};

