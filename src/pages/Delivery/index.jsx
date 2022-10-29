import React, { useState, useEffect } from 'react';
import {
  Page,
  Block,
  BlockTitle,
  Navbar,
  NavRight,
  NavLeft,
  NavTitle,
  Icon,
  Preloader, Link, Tabs, Tab
} from "framework7-react";
import { getOrdersAreas } from '../../actions/orders';
import AreaList from '../../components/Delivery/AreaList';



const Delivery = () => {
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getOrdersAreas()
      .then(({ data }) => {
        setAreas(data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* Handle Assign 
  const handleSubmit = useCallback(
    (courier_id) => {
      dispatch(assignOrder({ courier_id, orders: selected }))
        .then(({ data }) => {
          toast(data.message);
          getData();
          setSelected([]);
          //setModal(false);
        })
        .catch((err) => {
          //toast(err.message, 'danger');
          alert('error');
        });
    },
    [dispatch, getData, selected]
  );*/

  return(
    <Page>
      <Navbar title="Zone domicilio">
      </Navbar>
      {loading ? <Preloader/> : <AreaList areas={areas}/>} 
    </Page>
  );
}

export default Delivery;
