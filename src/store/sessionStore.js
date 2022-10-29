import { getPulseOrders } from '../actions/orders';
import { f7 } from "framework7-react";
import audio from "../assets/sounds/case-closed.mp3";
import { getLastUpdate } from '../actions/firebase';

const current_time = Date.now();

const playSound = async () =>  {
    const media = audio;
    //media.muted = true; // without this line it's not working although I have "muted" in HTML
   await media.play();
}
export const sessionStore = {
  state: {
    loading: false,
    last_update: current_time,
    current_time: current_time,
    summary: {},
  },
  actions: {
        //Set firebase  notification
        setSession({ state }, { time }) {
          if(time >= state.last_update){
            f7.notification.create({
              title: 'Ceebo Ristorante',
              titleRightText: 'adesso',
              subtitle: 'Nuvo ordine 🎉',
              text: 'Hai ricevuto un nuvo ordine',
              closeTimeout: 5000,
            }).open();
            playSound();
            f7.view.main.router.refreshPage();
          }else{
            console.log('nor orders yet...')
          }
          
          console.log('firebase.last_update', time);
          console.log('local.last_update', state.last_update);
          console.log('current_time', current_time);
          state.last_update = time;
        },
        
        //Get firebase last update time for notification
        getSession({ state }) {
          state.loading = true;
          //console.log('query', query);
          // fetch cart data from API
          getLastUpdate()
            .then(( res ) => {
              // assignemt to new value - REACTIVE
              state.last_update = res;
              //console.log('firebase-get-data', res);
              state.loading = false;
            })
            .catch((err) => {
              console.log('🐞 error-api-firebase', err);
              state.loading = false;
            });
        },

        //Get summary order via API
        getSummary({ state }) {
          // fetch data pulse from API
            getPulseOrders()
            .then(({ data }) => {
              //state.summary = data;
              state.summary = data;
              //console.log('success-get-pulse', data);
              //console.log('pulse-state', state.summary);
            })
            .catch((err) => {
              console.log('error-summary-pulse')
            });
        },
  },
  getters: {
    loading({ state }) {
      return state.loading;
    },
    session({ state }) {
      return state.session;
    },
    summary({ state }) {
      return state.summary;
    }
  },
}