import React from 'react';
import { List, ListItem, Badge, Block, Icon } from "framework7-react";

const ListingList = ({ listings }) => {
  if (!listings.length) return (<Block>Non ci sono ordini per il momento</Block>);

  return (
    <List mediaList>
        {listings.map((data, i) => (
         <ListItem 
         key={data.id}
         mediaItem={true}
         noChevron={true}
         media={data.image_url}
         link="#"
         title={data.name} subtitle={'Numero ristorante #'+data.id} after={<Badge color="blue"><Icon size="14" f7="star_fill"/> {data.rating}</Badge>}/>
       ))}
      </List>
  );
};

export default ListingList;
