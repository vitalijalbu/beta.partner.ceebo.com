import instance from '../services/api';


export const getAvailabilities = () => {
  return instance.get(`/merchant/menu`);
};

export const getMenuOverview = () => {
  return instance.get(`/merchant/menu`);
};



export const setAvailabilities = (body) => {
  return instance.post(`/merchant/availabilities`, body);
};

export const orderMenu = (body) => {
  return instance
    .put(`/merchant/menu/order`, body)
    .then(({ data }) => {
      //toast(data.message || 'Menu successfully updated!');
      app.toast.create(data.message || 'Menu successfully updated!');
    })
    .catch((err) => {
      //toast(err?.message || 'Fail to update menu!', 'danger', 'danger');
      app.toast.create(err?.message || 'Fail to update menu!', 'danger', 'danger');
    });
};


export const getAllItems = (params) => {
  return instance.get(`/merchant/items`, { params });
};

export const getItem = (id) => {
  return instance.get(`/merchant/items/${id}`);
};

export const addItem = (body) => {
  return instance.post('/merchant/items/create', body);
};

export const updateItem = (body) => {
  return instance.put('/merchant/items/update', body);
};

export const duplicateItem = (id) => {
  return instance.put('/merchant/items/duplicate', { item_id: id });
};

export const deleteItem = (body) => {
  return instance.put('/merchant/items/delete', body);
};
