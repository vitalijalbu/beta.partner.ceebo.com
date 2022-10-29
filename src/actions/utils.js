import instance from '../services/api';


export const autocompleteLocation = (query) => {
      return instance.get(`https://jsonplaceholder.typicode.com/users?query=${query}`);
};