import React, { useState, useEffect } from "react";
import { getAvailabilities } from "../../actions/items";
import {
  View,
  Page,
  Navbar,
  Preloader,
  Button,
  Panel,
  Toolbar,
  useStore,
  f7,
} from "framework7-react";
import CartOverview from "../../components/Checkout/CartOverview";
import SectionItems from "../../components/Checkout/SectionItems";

const Checkout = () => {
  const cart = useStore('cart');
  const [loading, setLoading] = useState(true);
  const [data, setItems] = useState([]);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  useEffect(() => {
    getAvailabilities()
      .then(({ data }) => {
        setItems(data ? data : []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Page>
        <Navbar title="Menu"></Navbar>
    {loading ? (
        <Preloader/>
      ) : (
        <>
          {data.map((section, i) => (
            <SectionItems data={section} key={i} />
          ))}
        </>
      )}
      {!matches && (<Toolbar className="tab-footer padding" tabbar bottom inner={false} style={{marginBottom: '50px'}}>
        <Button large fill panelOpen="#panelCart">
          Carrello ({cart.total_items}) {cart.cart_total > 0 ? (cart.cart_total+ " " + cart.currency_code) : '0.00'}
        </Button>
      </Toolbar>)}
      
      
      <Panel classNme="panel-cart" opened={matches} visibleBreakpoint={768} right cover containerEl="#panel-page" id="panelCart">
      <CartOverview/>
      </Panel>    
      </Page>
  );
};

export default Checkout;