import React, { useState, useRef } from "react";
import {
  Page,
  Navbar,
  Icon,
  Button,
  Popup,
  NavLeft,
  NavTitle,
  Toolbar,
  List,
  ListItem,
  ListInput,
  Toggle
} from "framework7-react";



const ItemPopup = ({ opened, onChange, onSubmit, close, isLoading, data }) => {
console.log('current-item-child', data);


  return (
    <Popup opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
        <NavLeft>
            <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
          </NavLeft>
          <NavTitle>{data.name}</NavTitle>
        </Navbar>
        <List noHairlinesMd>
          <ListInput
            label="Prezzo"
            type="number"
            name="unit_price"
            min="0.1"
            step="0.1"
            max="99"
            validate
            clearButton
            required
            placeholder="Prezzo"
            value={data?.unit_price || ''}
            onInput={onChange}
          />
          <ListItem>
            <span>Attivo?</span>
            <Toggle value={data?.active} defaultChecked={data?.active} color="green" name="active" onChange={onChange}></Toggle>          
            </ListItem>
        </List>
        <List>
          <ListItem
            title="Modifica piatti menù"
            link="https://partner.ceebo.com/menu/overview"
            target="_blank"
            external
          ></ListItem>
        </List>
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button large fill onClick={onSubmit} preloader loading={isLoading} className={isLoading && 'disabled'}>Salva</Button>
          </Toolbar>
      </Page>
    </Popup>
  );
};

export default ItemPopup;
