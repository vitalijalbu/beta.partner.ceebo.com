import React, { useState } from "react";
import {
  Col,
  Chip,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  f7
} from "framework7-react";
import ItemPopup from "./ItemPopup";

import { updateItem } from '../../../actions/items';


const Item = ({ data, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [active, setActive] = useState(false);
  const [form, setFormValues] = useState({
            'id': data?.id,
            'unit_price': data?.unit_price,
            'active': !data.active
          });

  
  /* Toggle Item Popup */
  const openPopup = () => {
    setPopup(true);
  };
  const closePopup = () => {
    setPopup(false);
  };


  /* Input change parent state */
  const changeHandler = (e) => {
    e.preventDefault();
      setFormValues((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value };
      });
  };

        /* Toggle Edit */
        const handleUpdate = () => {
          console.log('parent-item', form);
          updateItem(form)
            .then(({ data }) => {
              closePopup();
              setLoading(true);
              f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
              onUpdate();
            })
            .catch((err) => {
              f7.toast.show({
                text: err.message,
                horizontalPosition: "center",
                closeTimeout: 2500,
                cssClass: "danger"
              });
            }).finally(() => {
              setLoading(false);
            });
        };
  


  return (
    <>
    <ItemPopup
      opened={popup} 
      close={closePopup}
      data={form}
      onSubmit={handleUpdate}
      isLoading={loading} 
      onChange={changeHandler}
    />
    <Col width="50" medium="25" onClick={openPopup}>
      <Card className="item-card_header no-margin">
        <CardHeader valign="bottom">
          <img src={data.image_url} className="card-img" alt={data.title} />
          {data.active === false ? <Chip text="Non disponibile" className="product-badge"/> : null}
        </CardHeader>
        <CardContent>
          <h2 className="item-card_title m-0">{data.name}</h2>
        </CardContent>
        <CardFooter>
          <h3 onClick={openPopup} className="text-price">
            {data.currency_code + " " + data.unit_price}
          </h3>
        </CardFooter>
      </Card>
    </Col>
    </>
  );
};

export default Item;
