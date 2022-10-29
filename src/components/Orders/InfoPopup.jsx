import React, { useState, useRef } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Icon,
  Popup,
  NavRight,
  NavTitle,
  Button,
  List,
  ListItem  
} from 'framework7-react';


const CustomerPopup = ({ opened, close, data }) => {
  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
          <NavTitle>Contatta cliente</NavTitle>
             <NavRight>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavRight>
          </Navbar>
          <BlockTitle>Dettagli cliente</BlockTitle>
          <List mediaList>
            <ListItem
              link="#"
              title={data? data.name : ""}
              subtitle={data? data.phone_number : ""}
              text={data? data.email : ""} 
            >
              <img
                slot="media"
                src={data? data.image_url : ""} 
                width="80"
              />
            </ListItem>
            </List>
        </Page>
  </Popup>
  );
};

export default CustomerPopup;
