import React from 'react';
import { List, ListItem, Badge, Block } from "framework7-react";

const OrderList = ({ orders }) => {
  if (!orders.length) return (<Block strong className="empty-state">Non ci sono ordini da mostrare</Block>);
  console.log('child-orders', orders);
  return (
    <List mediaList>
        {orders.map((data, i) => (
          <ListItem
          className="order-item" 
          key={data.id}
          media={false}
          link={"/orders/" + data.id} 
          header={data.created_at}
          title={'#'+data.id} 
          subtitle={data.dropoff?.name}
          text={<Badge style={{ background: data.status_color }}>{data.status}</Badge>} 
          after={data.currency_code + ' ' + data.total_price}/>
        ))}
      </List>
  );
};

export default OrderList;
