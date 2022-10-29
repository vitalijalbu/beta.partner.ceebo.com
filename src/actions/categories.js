import instance from '../services/api';


export const getAllCategories = (params) => {
  return instance.get(`/merchant/categories`, { params });
};


export const getCategory = (id) => {
  return instance.get(`/merchant/categories/${id}`);
};

export const addCategory = (body) => {
  return instance.post('/merchant/categories/create', body);
};

export const updateCategory = (body) => {
  return instance.put('/merchant/categories/update', body);
};

export const deleteCategory = (id) => {
  return instance.put('/merchant/categories/delete', { id });
};
