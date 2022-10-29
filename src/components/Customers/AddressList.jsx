import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  ListItem,
  ListButton,
  SwipeoutActions,
  SwipeoutButton,
  Block,
  f7,
} from "framework7-react";
import AddressPopup from "./AddressPopup";
import {
  getCustomerAddresses,
  deleteCustomerAddress,
  addCustomerAddress,
} from "../../actions/customers";

const AddressList = ({ customerId }) => {
  const [loading, setLoading] = useState(false);
  const [addressPopup, setAddressPopup] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [form, setFormValues] = useState({ 'customer_id': customerId });

  /* Toggle Create Address */
  const openPopup = () => {
    setAddressPopup(true);
  };
  const closePopup = () => {
    setAddressPopup(false);
  };

  /* Get all addresses */
  const handleAddresses = useCallback(() => {
    getCustomerAddresses(customerId)
    .then(({ data }) => {
      setAddresses(data || []);
    })
    .catch((err) => {
      console.log('err', err)
      if (err?.message) {
        f7.toast.show({
          text: err.message,
          horizontalPosition: "center",
          closeTimeout: 2000,
          cssClass: "danger",
        });
      }
    });
  }, [customerId]);  

  
  useEffect(() => {
    handleAddresses();
  }, [customerId]);

  /* Query update data */
  const handleSubmit = (e) => {
    e.preventDefault()
    const listing_id = import.meta.env.VITE_APP_DEMO_LISTING_ID;
    addCustomerAddress({ ...form, listing_id })
      .then(({ data }) => {
        if (data.success === true) {
          setAddressPopup(false);
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "success",
          });
          handleAddresses();
          //f7.view.main.router.refreshPage();
        } else {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
        }
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
        }
      });
  };

  /* Input change parent state */
  const handleOnChange = (e) => {
    setFormValues((prevState) => {
      if (!e.target) {
        return { ...prevState, formatted_address: e.formatted_address };
      } else {
        return { ...prevState, [e.target.name]: e.target.value };
      }
    });
  };
 //console.log("🌿 address-form-parent", form);

  const handleDelete = (id) => {
    f7.actions
      .create({
        buttons: [
          [
            {
              text: "Sei sicuro di voler eliminare il deposito?",
              label: true,
            },
            {
              text: "Elimina",
              color: "red",
              onClick: function () {
                deleteCustomerAddress({
                  customer_id: customerId,
                  address_id: id,
                })
                  .then(({ data }) => {
                    setAddresses((prev) => prev.filter((i) => i.id !== id));
                    f7.toast.show({
                      text: data.message,
                      horizontalPosition: "center",
                      closeTimeout: 2000,
                      cssClass: "success",
                    });
                  })
                  .catch((err) => {
                    if (err?.message) {
                      f7.toast.show({
                        text: err.message,
                        horizontalPosition: "center",
                        closeTimeout: 2000,
                        cssClass: "danger",
                      });
                    }
                  });
              },
            },
          ],
          [
            {
              text: "Annulla",
              bold: true,
            },
          ],
        ],
      })
      .open();
  };

  return (
    <>
      <AddressPopup
        opened={addressPopup}
        close={closePopup}
        isLoading={loading}
        onSubmit={handleSubmit}
        onChange={handleOnChange}
      />
      {addresses.length ? (
        <List mediaList>
          {addresses.map((data, i) => (
            <ListItem
              key={i}
              swipeout
              title={data.formatted_address}
              subtitle={data.phone_number}
              text={data.name}
            >
              <SwipeoutActions right>
                <SwipeoutButton
                  color="red"
                  onClick={() => handleDelete(data.id)}
                >
                  Elimina
                </SwipeoutButton>
              </SwipeoutActions>
            </ListItem>
          ))}
        </List>
      ) : (
        <Block strong>Il cliente non ha indirizzi</Block>
      )}
      <List>
        <ListButton title="Crea un nuovo indirizzo" onClick={openPopup} />
      </List>
    </>
  );
};

export default AddressList;
