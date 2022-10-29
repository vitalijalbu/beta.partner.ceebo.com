import React, { useState, useCallback } from "react";
import {
  Page,
  Navbar,
  Block,
  Popup,
  NavRight,
  NavTitle,
  Link,
  Icon,
  List,
  ListItem,
  Button,
  Tabs,
  Tab,
  Toolbar,
  Segmented,
  BlockTitle,
  useStore,
  f7,
} from "framework7-react";
import SelectPopup from "../Couriers/SelectPopup";
import { checkOut } from "../../actions/checkout";
import { assignOrder } from "../../actions/orders";

const CheckoutPopup = ({ opened, close, onSubmit, data }) => {
  const cart = useStore("cart");
  //const customer = cart.customer;


  const [loading, setLoading] = useState(true);
  const [selected_orders, setSelectedOrders] = useState([]);
  const [payment_method, setPaymentMethod] = useState("cash");
  const [couriersPopup, setCouriersPopup] = useState(false);
  const [courier_id, setCourier] = useState();

  const openCouriersPopup = () => {
    setCouriersPopup(true);
  };
  const closeCouriersPopup = () => {
    setCouriersPopup(false);
  };

  //console.log("✅ data-from-parent", data);

  

  /* Assign orders */
  const handleAssignSubmit = useCallback(
    (courier_id) => {
      assignOrder({ courier_id, orders: selected_orders })
        .then(({ data }) => {
          console.log(data);
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 1200,
            cssClass: "success",
          });
          /* redirect */
          closeCouriersPopup();
          f7router.navigate("/delivery", { reloadAll: true });
        })
        .catch((err) => {
          if (err?.message) {
            f7.toast.show({
              text: data.message,
              horizontalPosition: "center",
              closeTimeout: 1200,
              cssClass: "danger",
            });
          }
        });
    },
    [courier_id, selected_orders]
  );


  return (
    <Popup className="update-popup" opened={opened} onPopupClosed={close}>
      <Page pageContent={false}>
        <Navbar>
          <NavTitle>Completa ordine</NavTitle>
          <NavRight>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavRight>
        </Navbar>
        {/* TABS */}
        <Tabs animated>
          {/* TAB 1 */}
          <Tab id="order-checkout" className="page-content" tabActive>
            {/* Payment Method */}
            <BlockTitle>Seleziona metodo di pagamento</BlockTitle>
            <Block strong>
              <Segmented strong>
                <Button
                  large
                  active={payment_method === "cash"}
                  onClick={() => setPaymentMethod("cash")}
                >
                  Contanti
                </Button>
                <Button
                  large
                  active={payment_method === "discount"}
                  onClick={() => setPaymentMethod("discount")}
                >
                  Segna come già pagato
                </Button>
              </Segmented>
            </Block>
            {/* Cart data here */}
            <List>
              <ListItem
                title="Cliente"
                after={data?.customer ? data.customer.full_name : "Seleziona cliente"}
              />
              <ListItem title="Totale prodotti" after={data?.cart.total_items} />
            </List>
            <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button
                large
                fill
                onClick={onSubmit}
                //tabLink="#order-confirmed"
              >
                Conferma ordine
              </Button>
            </Toolbar>
          </Tab>
          {/* Tab order confirmed */}
          <Tab id="order-confirmed" className="page-content">
            <BlockTitle large>{"Ordine #234 confermato"}</BlockTitle>
            <List>
              <ListItem title="Cliente" after="demo" />
              <ListItem title="Prodotti" after="2" />
              <ListItem title="Tipo" after="delivery" />
              <ListItem title="Totale" after="24" />
            </List>
            <Block bottom className="padding">
              <Button large outline className="margin-bottom">
                Stampa ricevuta
              </Button>
              <Button large fill color="black" className="margin-bottom">
                Vedi ordine
              </Button>
              <Button large outline onClick={openCouriersPopup}>
                Assegna corriere
              </Button>
            </Block>
          </Tab>
        </Tabs>
      </Page>
      <SelectPopup
        opened={couriersPopup}
        close={closeCouriersPopup}
        setCourier={setCourier}
        onSubmit={handleAssignSubmit}
        tot_ref={selected_orders.length}
      />
    </Popup>
  );
};

export default CheckoutPopup;
