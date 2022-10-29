import React from 'react';
import { List, ListItem } from "framework7-react";

const AeraList = ({ data }) => {
  if (!data.length) return ('Non ci sono ordini da mostrare');

  return (
    <List mediaList>
        {data.map((area, i) => (
          <ListItem key={area.id} link={"/assign/" + area.id} title={area.id} />
        ))}
      </List>
  );
};

export default AeraList;
