import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  Preloader, Link, Button, Toolbar, f7
} from "framework7-react";
import { getAllOrders } from '../../actions/orders';
import OrderList from '../../components/Orders/OrderList';


const Orders = (props) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({});
  //const [popup, setFilters] = useState(false);
  const [archived, setArchived] = useState(false);
  

  const params = useRef(() => {
    return {'archived': archived};
  }, [archived]);

  const actionOrders = useCallback((params) => {
    getAllOrders()
      .then(({ data }) => {
        setOrders(data?.data || []);
        setSummary(data?.summary);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    actionOrders();
  }, [params]);


  const setTabs = () =>{
    setArchived(!archived);
    setLoading(true);
  }

  return(
    <Page>
        <Navbar>
        <NavTitle large>Ordini</NavTitle>
      </Navbar>
      {/*<Toolbar tabbar top>
        <Link href="#" onClick={setTabs} tabLinkActive={archived === false}>Ordini di oggi</Link>
        <Link href="#" onClick={setTabs} tabLinkActive={archived === true}>Tutti gli ordini</Link>
  </Toolbar>*/}

      {loading ? <Preloader/> : <OrderList orders={orders}/>}
    </Page>
  );
}

export default Orders;
