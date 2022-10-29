import instance from '../services/api';

export const getAllModifiers = (params) => {
  return instance.get(`/merchant/modifiers`, { params });
};

export const getModifier = (id) => {
  return instance.get(`/merchant/modifiers/${id}`);
};

export const updateModifier = (body) => {
  return instance.put('/merchant/modifiers/update', body);
};

export const addModifier = (body) => {
  return instance.post('/merchant/modifiers/create', body);
};

export const deleteModifier = (id) => {
  return instance.put('/merchant/modifiers/delete', { id });
};
