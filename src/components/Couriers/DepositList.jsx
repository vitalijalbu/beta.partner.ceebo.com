import React, { useState } from "react";
import { Block, List, ListItem, Badge, SwipeoutActions, SwipeoutButton, f7 } from "framework7-react";
import InfoDepositPopup from './InfoDepositPopup';
import DepositPopup from './DepositPopup';
import { deleteDeposit, updateDeposit } from "../../actions/couriers";


const DepositList = ({ data, onUpdate }) => {
  if (!data.length) return (<Block>Nessun deposito per il momento</Block>);

  const [loading, setLoading] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [selected, setSelectedDeposit] = useState({});
  const deposits = Array.isArray(data) ? data : [];

    /* Toggle Create Popup */
    const openEditPopup = (item) => {
      setSelectedDeposit(item);
      setEditPopup(true);
    };
    const openInfoPopup = (item) => {
      setInfoPopup(true);
      setSelectedDeposit(item);
    };
    const closeEditPopup = () => {
      setEditPopup(false);
      //setSelectedDeposit({});
    };
  const closeInfoPopup = () => {
      setInfoPopup(false);
      setSelectedDeposit({});
    };

      /* Handle Delete */
    const handleDelete = (id) => {
      f7.actions.create({
        buttons: [
          [
            {
              text: 'Sei sicuro di voler eliminare il deposito?',
              label: true,
            },
            {
              text: 'Elimina',
              color: 'red',
              onClick: function () {
                deleteDeposit({ id })
                  .then(({ data }) => {
                    /* Update prev state parent*/
                    onUpdate(deposits.filter((i) => i.id !== id));
                    console.log("deleted-success");
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
              text: 'Annulla',
              bold: true,
            },
          ],
        ],
      }).open();
    };

      /* Input change parent state */
  const handleOnChange = (e) => {
    setSelectedDeposit((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

    /* Create New Deposit */
    const handleUpdateDeposit = () => {
      
      updateDeposit({ ...selected })
        .then(({ data }) => {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 1200,
            cssClass: "success",
          });
          closeEditPopup();
          onUpdate();
        })
        .catch((err) => {
          if (err?.message) {
            f7.toast.show({
              text: err.message,
              horizontalPosition: "center",
              closeTimeout: 2500,
              cssClass: "danger",
            });
          }
        });
    };

  //console.log('data-to-update', selected);
  return (
    <>
    <List mediaList>
        {deposits.map((item, i) => (
          <ListItem 
          swipeout
          key={i}
          link="#"
          //onClick={() => openPopup(data)}
          title={'#'+item.id} 
          subtitle={'Creato il ' + item.created_at} 
          text={item.registered ? (
            <Badge color="gray">
              Archiviato
            </Badge>
          ) : (
            <Badge color="primary">
              In corso
            </Badge>
          )}
          after={item.amount + ' ' + item.currency_code}
          >
          <SwipeoutActions right>
            {!item.registered &&( <SwipeoutButton color="black" onClick={() => openEditPopup(item)}>Modifica</SwipeoutButton>)}
            {item.registered &&( <SwipeoutButton color="gray" onClick={() => openInfoPopup(item)}>Info</SwipeoutButton>)}
            {!item.registered && (<SwipeoutButton color="red" onClick={() => handleDelete(item.id)}>Elimina</SwipeoutButton>)}
        </SwipeoutActions>
      </ListItem>
        ))}
      </List>
      <InfoDepositPopup
      close={closeInfoPopup}
      opened={infoPopup}
      data={selected}
    />
    <DepositPopup
      close={closeEditPopup}
      opened={editPopup}
      onChange={handleOnChange}
      data={selected}
      isLoading={loading}
      onSubmit={handleUpdateDeposit}
    />
    </>
  );
};

export default DepositList;
