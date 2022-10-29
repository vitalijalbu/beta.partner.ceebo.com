import React, { useState } from "react";
import { List, ListItem, Block, Badge } from "framework7-react";



const OrderList = ({ orders, setSelectedOrders }) => {
  if (!orders.length) return (<Block strong className="empty-state">Non ci sono ordini da mostrare</Block>);

  const [selected, setSelected] = useState([]);

  
  const onSelectChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      selected.push(value);
    } else {
      selected.splice(selected.indexOf(value), 1);
    }
    setSelected([...selected]);
    setSelectedOrders([...selected]);
  };
  //console.log('✅ child-selected-orders', selected);

  return (
    <List mediaList>
        {orders.map((data, i) => (
          <ListItem
            checkbox
            name="select-order"
            className="order-item"
            key={data.id}
            value={data.id}
            media={false}
            header={data?.dropoff_deadline}
            title={"#" + data.id}
            subtitle={data.dropoff?.name + " - " + data.dropoff?.formatted_address}
            text={<Badge style={{ background: data.status_color }}>{data.status}</Badge>} 
            after={data.currency_code + " " + data.total_price}
            onChange={(e) => onSelectChange(e)}
          />
        ))}
      </List>
  );
};

export default OrderList;
