import {
  getCart,
  incrementQty,
  decrementQty,
  clearCart,
  checkOut,
  addItemCart,
} from "../actions/checkout";
import { f7 } from "framework7-react";

export const cartStore = {
  state: {
    loading: false,
    query: {
      store: true,
      manually: true,
      session_guid: import.meta.env.VITE_APP_SESSION_GUID,
      address_id: null,
      type: "delivery",
    },
    cart: {}
  },
  actions: {
    /* Store Customer details instead of state file */
    setStoreCustomer({ state, dispatch }, { selected }) {
      //console.log("✅ data-received-into-store", selected);
      state = { ...selected };
      console.log("✅ return-store-data-cart", state.customer);
    },

    /* Store Dropoff time details instead of state file */
    setStoreAddress({ state, dispatch }, { selected }) {
      state.customer_address = selected;
      console.log("✅ return-customer_address", state.customer_address);
    },    
    
    /* Store Dropoff Address details instead of state file */
    setStoreDropoff({ state, dispatch }, { formatted }) {
      console.log("✅ data-received-into-store", formatted);
      state.dropoff_deadline = formatted;
      console.log("✅ return-store-data-cart", state.dropoff_deadline);
    },


    /* Increment Item Qty */
    incrementQty({ state, dispatch }, { body, query }) {
      state.loading = true;
      incrementQty(body)
        .then(({ data }) => {
          dispatch("loadCart", { query });
          state.loading = false;
        })
        .catch((err) => {
          console.log("🐞 Error occured", err);
          state.loading = false;
        });
    },

    /* Decrement Item Qty */
    decrementQty({ state, dispatch }, { body, query }) {
      state.loading = true;
      //console.log('increment clicked', {body})
      decrementQty(body)
        .then(({ data }) => {
          dispatch("loadCart", { query });
          state.loading = false;
        })
        .catch((err) => {
          console.log("🐞 error-decrement", err);
          state.loading = true;
        });
    },

    /* Clear Cart */
    empyCart({ state, dispatch }, { body, query }) {
      state.loading = true;
      clearCart(body)
        .then(({ data }) => {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "success",
          });
          dispatch("loadCart", { query });
          state.loading = false;
        })
        .catch((err) => {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
          state.loading = false;
        });
    },

    /* Clear Cart */
    checkOut({ state, dispatch }, { body }) {
      state.loading = true;
      query = state.query;
      console.log("checkout clicked");
      clearCart(body)
        .then(({ data }) => {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "success",
          });
          dispatch("loadCart", { query });
          state.loading = false;
        })
        .catch((err) => {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
          state.loading = false;
        });
    },

    /* Increment Item Qty */
    addToCart({ state, dispatch }, { body }) {
      state.loading = true;
      /*query = state.query;
            console.log('query', state.query);*/
      addItemCart(body)
        .then(({ data }) => {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "success",
          });
          dispatch('loadCart', { query });
          state.loading = false;
          close();
        })
        .catch((err) => {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
          console.log("🐞 Error occured", err);
          state.loading = false;
        });
    },

    /* Get cart data from api */
    loadCart({ state }, { query }) {
      state.loading = true;
      //console.log('query', query);
      // fetch cart data from API
      getCart(query)
        .then(({ data }) => {
          // assignemt to new value - REACTIVE
          state.query = { ...query };

          state.cart = { ...data };
          state.loading = false;
        })
        .catch((err) => {
          console.log("🐞 error-api-cart", err);
          state.loading = false;
        });
    },
  },
  getters: {
    cart: ({ state }) => state.cart,
    cart_items: ({ state }) => state.cart_items,
    customer: ({ state }) => state.customer,
    customer_address: ({ state }) => state.customer_address,
    dropoff_deadline: ({ state }) => state.dropoff_deadline,
    loading: ({ state }) => state.loading,
    query: ({ state }) => state.checkout_query,
  },
};