import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  Link,
  NavTitle,
  NavLeft,
  NavRight,
  Preloader,
  BlockTitle,
  Button,
  f7
} from "framework7-react";

import { viewAreaOrders } from "../../actions/orders";
import OrderList from "../../components/Delivery/OrderList";
import SelectPopup from "../../components/Couriers/SelectPopup";
import { assignOrder } from "../../actions/orders";

const View = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setArea] = useState({});
  const [orders, setOders] = useState([]);
  const [selected_orders, setSelectedOrders] = useState([]);
  const [couriersPopup, setCouriersPopup] = useState(false);
  const [courier_id, setCourier] = useState();

  useEffect(() => {
    setLoading(true);
    viewAreaOrders(id)
      .then(({ data }) => {
        setLoading(false);
        setArea(data);
        setOders(data?.orders || []);
      })
      .catch(() => {
        alert("error");
      });
  }, [id]);

  const openCouriersPopup = () => {
    setCouriersPopup(true);
  };
  const closeCouriersPopup = () => {
    setCouriersPopup(false);
  };


  /* Assign orders */
  const handleSubmit = useCallback((courier_id) => {
    assignOrder({ courier_id, orders: selected_orders })
    .then(({ data }) => {
        console.log(data);
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 1200, cssClass: 'success'});
        /* redirect */
        closeCouriersPopup();
        f7router.navigate('/delivery', {reloadAll: true });
      }).catch((err) => {
        if (err?.message) {
          f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 1200, cssClass: 'danger'});
        }
      })
    },
    [courier_id, selected_orders]
  );

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link
            reloadAll={true}
            iconF7="chevron_left"
            href="/delivery"
          >
            Zone domicilio
          </Link>
        </NavLeft>
        <NavTitle>{"Assegna ordini in " + data.name}</NavTitle>
        <NavRight>
          <Button
            disabled={!selected_orders.length}
            onClick={openCouriersPopup}
          >
            Assegna
          </Button>
        </NavRight>
      </Navbar>
      <BlockTitle>Seleziona ordini</BlockTitle>
      {loading ? (
        <Preloader />
      ) : (
        <OrderList orders={orders} setSelectedOrders={setSelectedOrders} />
      )}
      <SelectPopup
        opened={couriersPopup}
        close={closeCouriersPopup}
        setCourier={setCourier}
        onSubmit={handleSubmit}
        tot_ref={selected_orders.length}
      />
    </Page>
  );
};

export default View;
