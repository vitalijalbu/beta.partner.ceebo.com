import { createStore } from 'framework7/lite';
import { getPulseOrders } from '../actions/orders';
import { getCart } from '../actions/checkout';

const store = createStore({
  state: {
    cart: {
      items: [],
      total_items:0,
    },
    loading: false,
    last_update: "12:00",
      total_count: 1,
      total_delivery: 2,
      total_pickup: 0,
      total_checkout: 0
  },
  actions: {
    getAudit({ state }) {
      // fetch users from API
        getPulseOrders()
        .then(({ data }) => {
          state.audit = data;
          //console.log('success-get-pulse', state.audit)
        })
        .catch((err) => {
          console.log('error-pulse')
        });
    },
    /* Get cart items */
    getCartStore({ state }) {
      // fetch users from API
        getCart()
        .then(({ res }) => {
          state.cart = res;
          //console.log('success-get-pulse', state.audit)
        })
        .catch((err) => {
          console.log('error-cart')
        });
    },
    getListing({ state }) {
          return state.listing;
    }
  },
  getters: {
    loading({ state }) {
      return state.loading;
    },
    audit({ state }) {
      return state.audit;
    },
    cart({ state }) {
      return state.cart;
    },
  },
});

export default store;