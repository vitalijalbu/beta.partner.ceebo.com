import React from 'react';
import { List, ListItem, Badge, Block } from "framework7-react";

const CustomerList = ({ couriers }) => {
  if (!couriers.length) return (<Block strong>Non ci sono rider da mostrare</Block>);

  return (
    <List mediaList>
        {couriers.map((data, i) => (
          <ListItem 
          key={data.id}
          mediaItem={true}
          noChevron={true}
          media={data.image_url}
          link={"/couriers/" + data.id} 
          title={data.full_name} subtitle={<Badge color={data.online === true ? 'green' : 'grey'}>{data.status}</Badge>} after={data.total_orders}/>
        ))}
      </List>
  );
};

export default CustomerList;
