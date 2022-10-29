import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  Popup,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  List,
  ListItem,
  Subnavbar,
  Searchbar,
  Icon,
  Button,
  Toolbar,
  Block,
  f7
} from "framework7-react";
import { getCustomerAddresses } from "../../actions/customers";
import { checkDistanceArea } from "../../actions/checkout";
import AddressPopup from "./AddressPopup";



const SelectAddressPopup = ({ id, opened, close, onSubmit }) => {

  if (!id){ return null}

  let customer_id = id;

  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState({});
  const [createPopup, setCreateCustomer] = useState(false);

  //console.log("🌿 success customer_id", customer_id);
  /* Fetch API Call */
  const getAddresses = useCallback(() => {
    getCustomerAddresses(customer_id)
      .then(({ data }) => {
        setAddresses(data || []);
        setLoading(false);
        console.log("🌿 success data from api", data);
      })
      .catch(() => {
        console.log("🚫 error fetch api");
      });
  }, [customer_id]);

  useEffect(() => {
    getAddresses();
  }, [customer_id]);


  const handleSubmit = () => {
    /* Set selected address isnide store.js */
    onSubmit(selected);
    close();
  };

  /* Toggle Address Modal */
  const openCreatePopup = () => {
    setCreateCustomer(true);
  };
  const closeCreatePopup = () => {
    setCreateCustomer(false);
  };  
  
  const checkDistance = useCallback((data) => {
    //console.log('address-clicked', data);
    setSelected(data);
    const params = {
      address_id: data.id
    }
    checkDistanceArea(params)
      .then(({ data }) => {
        setLoading(false);
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2000,
          cssClass: "success",
        });
      })
    .catch((data) => {
      console.log("🚫 error fetch api", data);
      f7.toast.show({
        text: data.message,
        horizontalPosition: "center",
        closeTimeout: 2000,
        cssClass: "error",
      });
    });
  }, []);

  return (
      <Popup className="create-popup" opened={opened} onPopupClosed={close}>
        <Page>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>Seleziona indirizzo consegna</NavTitle>
          <NavRight>
            <Button large type="button" onClick={handleSubmit} disabled={!selected}>
              Fatto
            </Button>
          </NavRight>
        </Navbar>
          <Subnavbar inner={false}>
            <Searchbar
              searchContainer=".search-list"
              searchIn=".item-title"
              disableButtonText="Annulla"
              placeholder="Cerca"
              clearButton={true}
            ></Searchbar>
          </Subnavbar>
          
          {Array.isArray(addresses) ? (
           <List mediaList>
            {addresses.map((data, i) => (
              <ListItem
                onChange={() => checkDistance(data)}
                radio
                value={data.id}
                key={i}
                name="select-address"
                mediaItem={true}
                title={data.formatted_address}
                subtitle={data.phone_number}
                text={data.name}
              >
              <Icon slot="media" f7="placemark"></Icon>
            </ListItem>
            ))}
            </List>
            ) : (
              <Block strong>Nessun prodotto</Block>
            )}
          
          <Toolbar className="tab-footer" tabbar bottom inner={false}>
            <Button large fill onClick={openCreatePopup} preloader loading={loading}>
              Crea nuovo indirizzo
            </Button>
          </Toolbar>
          <AddressPopup opened={createPopup} close={closeCreatePopup} />
        </Page>
      </Popup>
  );
};

export default SelectAddressPopup;
