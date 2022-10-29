import React from 'react';
import { BlockTitle, List, ListItem, Chip, Badge } from "framework7-react";

const MediaList = ({ data }) => {
  if (!data) return ('Non ci sono ordini da mostrare');


  return (
    <>      
    <BlockTitle medium>{data.name}</BlockTitle>
        <List mediaList>
        {data.items.map((item, i) => (
              <ListItem
              key={i}
              mediaItem={true}
              media={item.image_url}
              link="#"
              title={item.name}
              subtitle={item.active === false ? <Chip text="Non disponibile"/> : null}
              after={item.currency_code + " " + item.unit_price}/>
            ))}
        </List>
    </>
  );
};

export default MediaList;
