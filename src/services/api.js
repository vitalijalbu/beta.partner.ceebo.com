import axios from 'axios';
import { Preferences } from '@capacitor/preferences';


const token = await Preferences.get({ key: "auth_token" });
const listing_storage = await Preferences.get({ key: "listing" });

const listing_id = JSON.parse(listing_storage.value);
//console.log(' JSON.parse', listing_id.id);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'listing-id': listing_id?.id,
    'Authorization' : 'Bearer ' + token.value
}
});


/*

export const setInstance = (token) => {
  //localStorage.setItem('auth_token', token.value);
  //console.log('local instance---_>', token);
  instance.defaults.headers['Authorization'] = 'Bearer ' + token.value;
};

export const setListingId = (listing_id) => {
  
  //localStorage.setItem('listing_id', listing_id);
  instance.defaults.headers['listing-id'] = listing_id;
  return Promise.resolve();
};

export const removeInstance = () => {
  localStorage.removeItem('auth_token');
  delete instance.defaults.headers['Authorization'];
  localStorage.removeItem('listing_id');
  delete instance.defaults.headers['listing-id'];
};

if (!localStorage.getItem('auth_token')) {
  //instance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
  instance.defaults.headers['Authorization'] = 'Bearer ' + token;
}

*/
const isValidResponse = (res) => {
  return typeof res !== 'string';
};

instance.interceptors.response.use(
  (response) => {
    if (response.data.success === false || response.data.error === true) {
      return Promise.reject(response.data);
    }
    // TODO: Remove when it will be fixed in backend
    if (!isValidResponse(response.data)) {
      return Promise.reject({ success: false, message: 'Response is invalid' });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);

export default instance;
