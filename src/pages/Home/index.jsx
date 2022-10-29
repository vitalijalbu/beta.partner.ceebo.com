import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Page,
  Navbar,
  Preloader,
  useStore,
  f7
} from "framework7-react";
import { getDraftOrders } from '../../actions/orders';
import OrderList from '../../components/Home/OrderList';

const Home = () => {

  const session = useStore('session');
  const last_update = session.last_update;

  

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);



  const actionOrders = useCallback(() => {
    getDraftOrders()
      .then(({ data }) => {
        setOrders(data?.data || []);
        //setSummary(data?.summary || {});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);  
  
  

  useEffect(() => {
    actionOrders();
    f7.store.dispatch('getSession');
    console.log('home-session.last_update', session.last_update);
  }, [session.last_update]);


  return(
    <Page>
        <Navbar title="Nuovi ordini">
      </Navbar>
      {loading ? <Preloader/> : <OrderList orders={orders}/>}
    </Page>
  );
}

export default Home;
