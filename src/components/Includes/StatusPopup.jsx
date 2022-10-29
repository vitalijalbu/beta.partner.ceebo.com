import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  NavRight,
  Button,
  List,
  ListItem,
  Icon,
  Toggle,
  f7,
  useStore,
} from "framework7-react";
import { Bike, ShoppingBag } from "../../utilities/Icons/";
import { updateListing } from "../../actions/listings";

const StatusPopup = ({ opened, close }) => {
  

  const listingStore = useStore("listing");
  const listing = listingStore;
  //const loading = listingStore.loading;

  const [form, setFormValues] = useState({
    'is_paused': Boolean(listing?.is_paused),
    'delivery': Boolean(listing?.delivery),
    'pickup': Boolean(listing?.pickup)
  });

  //console.log("state-listing", form);

  useEffect(() => {
    // Load cart from store when component mounted
    f7.store.dispatch("loadListing");
  }, []);

  /* Update listing 
  const handleUpdate = (name, e) => {
    //e.preventDefault();
    console.log('changed', name, Boolean(!e));
      /*setFormValues((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value };
      });
  };*/

  /* Input change parent state */
  const handleUpdate = (name, value) => {
    console.log(name, !value);
    setFormValues((l) => ({ ...l, [name]: !value }));
  };

  return (
    <Popup id="status-popup" opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>{"Stato ristorante - " + listingStore?.name}</NavTitle>
        </Navbar>
        <BlockTitle>Modifica stato</BlockTitle>
        <List medialist>
          <ListItem>
            <span>Ristorante in pausa</span>
            <Icon slot="media" f7="pause_circle"></Icon>

            <Toggle
              checked={form.is_paused}
              onToggleChange={(e) => handleUpdate("is_paused", e)}
              name="is_paused"
              color="green"
            ></Toggle>
          </ListItem>
          <ListItem>
            <Icon slot="media">
              <Bike />
            </Icon>
            <span>Consegna a domicilio</span>
            <Toggle  
             checked={form.delivery}
             onToggleChange={(e) => handleUpdate("delivery", e)}
             color="green">
            </Toggle>
          </ListItem>
          <ListItem>
            <Icon slot="media">
              <ShoppingBag />
            </Icon>
            <span>Ritiro</span>
            <Toggle  
             checked={form.pickup}
             onToggleChange={(e) => handleUpdate("pickup", e)}
            color="green"></Toggle>
          </ListItem>
        </List>
        <BlockTitle>Altro</BlockTitle>
        <List>
          <ListItem title="Modifica altri dati ristorante" link="#" />
          <ListItem title="Ricevi assistenza" link="#" />
          <ListItem title="Vedi ristorante" link="#" />
        </List>
      </Page>
    </Popup>
  );
};

export default StatusPopup;
