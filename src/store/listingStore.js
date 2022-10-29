import {
  getListing,
  updateListing,
} from "../actions/listings";
import { f7 } from "framework7-react";
import { Preferences } from "@capacitor/preferences";

export const listingStore = {
  state: {
    loading: false,
    listing: {}
  },
  actions: {
    
    /* Clear listing */
    updateStoreListing({ state, dispatch }, { body }) {
      state.loading = true;
      updateListing(body)
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


    /* Get listing data from api */
    loadListing({ state, dispatch }) {
      state.loading = true;
      //console.log('query', query);
      // fetch listing data from API
       const storage = Preferences.get({ key: "listing" });
       if (storage.value !== null && storage?.length !== 0) {
        storage.then(({ value }) => {
          //console.log('store-here', value);
          // assignemt to new value - REACTIVE
          state.listing = JSON.parse(value);
          state.loading = false;
        })
        .catch((err) => {
          console.log("🐞 error-api-listing", err);
          state.loading = false;
        });
      }

    },
  },
  getters: {
    listing: ({ state }) => state.listing,
    loading: ({ state }) => state.loading
  },
};