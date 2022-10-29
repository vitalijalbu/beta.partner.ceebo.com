import {  f7 } from "framework7-react";
import { userLogin } from '../actions/user';
import { Preferences } from "@capacitor/preferences";

export const userStore = {
  state: {
      loading: false,
      authorized: false,
      user_data: {}
  },
  actions: {
    
    /* Get user data from api */
    loadUser({ state, dispatch }, { form }) {
      state.loading = true;
      //console.log('form', form);
      // fetch user data from API
      Preferences.get({ key: "user" })
        .then(({ data }) => {
          // assignemt to new value - REACTIVE
          //state.form = { ...form };
          state.user_data = data?.user_data;
          state.authorized = true;
          //console.log('returned-data-json', data);
          state.loading = false;
          console.log("✅ return-store-data-cart", state.listing);
        })
        .catch((err) => {
          console.log("🐞 error-api-user", err);
          if (err?.success === false) {
            f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2000, cssClass: 'danger'});
          }
          state.loading = false;
        });
    },



  },
  getters: {
    user: ({ state }) => state.user,
    authorized: ({ state }) => state.authorized,
    user_data: ({ state }) => state.user_data
  },
}