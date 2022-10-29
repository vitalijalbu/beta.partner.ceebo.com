import { createStore } from 'framework7/lite';
// import store
import { cartStore } from './cartStore';
import { sessionStore } from './sessionStore';
import { userStore } from './userStore';
import { listingStore } from './listingStore';

const store = createStore({
  state: {
    session: 
    {
      ...sessionStore.state
    },
    summary:{
      ...sessionStore.state.summary
    },
    cart:{
      ...cartStore.state
    },
    user:{
      ...userStore.state
    },
    listing:{
      ...listingStore.state
    }
  },
  getters: {
    ...cartStore.getters,
    ...sessionStore.getters,
    ...userStore.getters,
    ...listingStore.getters,
  },
  actions: {
    ...cartStore.actions,
    ...sessionStore.actions,
    ...userStore.actions,
    ...listingStore.actions
  }
});

export default store;