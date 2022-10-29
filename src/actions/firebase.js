import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from "../services/firebase";
import store from '../js/store';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { f7 } from "framework7-react";



//console.log('todo-store-last_update', store.state.last_update);



const dbRef = ref(db, 'listings/'+ 1000);

export const getLastUpdate = async () => {
  onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  const time = data?.last_update;
  const currentTime = new Date().getTime();

  if (data) {
    //setBlogs(data);
   // console.log("firebase-get-time:", time)
    f7.store.dispatch('setSession', { time });
  } else {
    console.log("Firebase issue");
  }
  });
}


/*const dbRef = ref(getDatabase());

  
  export const getLastUpdated = async () => {
      return get(child(dbRef, `listings/${import.meta.env.VITE_APP_DEMO_LISTING_ID}`)).then((snapshot) => {
      if (snapshot.exists()) {
          const data = snapshot.val();
          return {data};
          console.log('snaphost-time', snapshot.val('last_update'));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });
}*/