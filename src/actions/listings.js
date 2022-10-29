import instance from '../services/api';

export const getAllListings = () => {
  return instance.get(`/merchant/listings`);
};

export const getListing = (id) => {
  return instance.get(`/merchant/listings/${id}`);
};
export const getListingMenu = (id) => {
    return instance.get(`/merchant/menu?checkout=true`);
};

/* old code cause nned to store them 
export const getDeliveryAreas = (force) => (dispatch, getState) => {
  const {
    Areas: { data, loading },
  } = getState();
  if ((!data.length && !loading) || force) {
    dispatch({ type: 'AREAS_LOADING' });
    instance.get(`/merchant/areas`).then(({ data }) => {
      dispatch({ type: 'AREAS_LOADED', payload: data || [] });
    });
  }
};
*/
export const getDeliveryAreas = (params) => {
  return instance.get('/merchant/areas', { params });
};

export const getBankInfo = () => {
  return instance.get(`/merchant/bank_account`);
};
export const getLegalInfo = () => {
  return instance.get(`/merchant/listings/legal_info`);
};
export const updateLegalInfo = (body) => {
  return instance.put(`/merchant/listings/update_legal`, body);
};

export const getAllCuisines = () => {
  return instance.get(`/listings/categories`);
};

export const getAllDiets = () => {
  return instance.get(`/listings/diets`);
};
export const getAllCollections = () => {
  return instance.get(`/listings/collections`);
};

export const getDeliveryArea = (id) => {
  return instance.get(`/merchant/areas/${id}`);
};
export const creatDeliveryArea = (body) => {
  return instance.post(`/merchant/areas/create`, body);
};
export const updateDeliveryArea = (body) => {
  return instance.put(`/merchant/areas/update`, body);
};
export const deleteDeliveryArea = (body) => {
  return instance.put(`/merchant/areas/delete`, body);
};
export const unarchiveDeliveryArea = (body) => {
  return instance.put(`/merchant/areas/recover`, body);
};
export const uploadPhoto = (body) => {
  return instance.post(`/merchant/listings/upload_photo`, body);
};

export const updateCover = (body) => {
  return instance.post(`/merchant/listings/update_cover`, body);
};

export const deletePhoto = (body) => {
  return instance.put(`/merchant/listings/remove_photo`, body);
};

export const updateListing = (body) => {
  return instance.put('/merchant/listings/update', body);
};

export const updateListingHours = (body) => {
  return instance.put('/merchant/listings/update_hours', body);
};
