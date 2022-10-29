import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Popup,
  NavRight,
  NavTitle,
  NavRight,
  Link,
  Button,
  List,
  ListItem,
  AccordionContent
  
} from 'framework7-react';


const EditOrderPopup = ({ open, onSubmit, close }) => {
  

  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
          <NavTitle>Mappa ordini</NavTitle>
             <NavRight>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavRight>
            
          </Navbar>
          <BlockTitle>List View Accordion</BlockTitle>
          <OrdersMap open={open} />
        </Page>
  </Popup>
  );
};

export default EditOrderPopup;
