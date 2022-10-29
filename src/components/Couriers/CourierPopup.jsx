import React, { useState, useRef } from 'react';
import {
  Page,
  Navbar,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  Button,
  List,
  Icon,
  ListButton,
  ListItem,
  ListInput,
  Toolbar,
  Toggle,
  f7
} from 'framework7-react';


const CourierPopup = ({ opened, onChange, onSubmit, close, isLoading, data }) => {

  //console.log("isLoading", isLoading);

  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
             <NavLeft>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>{data.lenght ? 'Modifica rider' : 'Crea nuovo rider'}</NavTitle>
          </Navbar>
          <List form noHairlinesMd>
          <ListInput
            label="Nome"
            type="text"
            name="first_name"
            placeholder="Nome"
            autoComplete="off"
            clearButton
            required
            validate
            value={data?.first_name || ''}
            onInput={onChange}
          />
          
          <ListInput
            label="Cognome"
            type="text"
            name="last_name"
            placeholder="Cognome"
            autoComplete="off"
            clearButton
            validate
            value={data?.last_name}
            onInput={onChange}
          />

          <ListInput
            label="E-mail"
            type="email"
            name="email"
            placeholder="E-mail"
            value={data?.email || ''}
            onInput={onChange}
            clearButton
            validate
          />

          <ListInput
            label="Telefono"
            type="number"
            name="phone_number"
            placeholder="Telefono"
            value={data?.phone_number || ''}
            onInput={onChange}
            clearButton
            required
            validate
          />
         
          <ListItem>
        <span>Attivo?</span>
        <Toggle defaultChecked={data?.active_status} color="green" name="active" onChange={onChange}></Toggle>
      </ListItem>
      </List>
          <List>
          <ListInput
            label="Note (facoltativo)"
            type="textarea"
            placeholder="Note"
            name="notes"
            minlength="5"
            maxlength="255"
            validate
            value={data?.notes || ''}
            onInput={onChange}
            clearButton
          />
        </List>
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button large fill onClick={onSubmit} preloader loading={isLoading} className={isLoading && 'disabled'}>Salva</Button>
          </Toolbar>
        </Page>
  </Popup>
  );
};

export default CourierPopup;
