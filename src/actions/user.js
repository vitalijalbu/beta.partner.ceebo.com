import instance from '../services/api';

/*
export const userLogin_OLD = (body) => {
  return instance
    .post('/merchant/login', body)
    .then(({ data }) => {
      return setListingId(data.listing.id).then(() => {
        setInstance(data.user_data.token);
        dispatch({ type: USER_LOADED, payload: { ...data.user_data, listing: data.listing } });
        return data.message;
      });
    })
    .catch((err) => {
      return Promise.reject(err.message);
    });
};
*/
export const userLogin = (form) => {
  return instance.post('/merchant/login', form);
};


export const resetPassword = (body) => {
  return instance.post('/merchant/reset_password', body);
};

export const forgotPassword = (body) => {
  return instance.post('/merchant/forgot_password', body);
};