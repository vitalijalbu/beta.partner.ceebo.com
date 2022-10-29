import React, { useState, useEffect } from 'react';
import {
  Page,
  Block,
  BlockTitle,
  Navbar,
  Subnavbar,
  Searchbar,
  NavRight,
  NavLeft,
  NavTitle,
  Preloader, Link, Button, Segmented, f7
} from "framework7-react";
import { getDraftOrders } from '../../actions/orders';
import OrderList from '../../components/Pickup/OrderList';


const Pickup = (props) => {
  const { f7route, f7router } = props;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState([]);

  const params = {
    'type': 'pickup'
  };

  useEffect(() => {
    getDraftOrders(params)
      .then(({ data }) => {
        setOrders(data?.data || []);
        //setSummary(data?.summary || {});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return(
    <Page ptr className="page-master">
          <Navbar title="Asporto">
      </Navbar>
      {loading ? <Preloader/> : <OrderList orders={orders}/>}
    </Page>
  );
}

export default Pickup;
