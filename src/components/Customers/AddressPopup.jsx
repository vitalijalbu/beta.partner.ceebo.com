import React, { useState } from 'react';
import {
  Page,
  Navbar,
  Icon,
  Popup,
  NavRight,
  NavTitle,
  Button,
  List,
  ListInput,
  Toolbar,
  
} from 'framework7-react';
import AddressField from '../FormFields/AddressField';

const AddressPopup = ({ opened, close, onSubmit, isLoading, onChange }) => {
  return (
    <Popup
    push={true}
    opened={opened}
    onPopupClosed={close}
  >
    <Page>
          <Navbar>
          <NavTitle>Crea nuovo indirizzo  cliente</NavTitle>
             <NavRight>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavRight>
            
          </Navbar>
          <List form noHairlinesMd id="address-form">
          <AddressField name="formatted_address" label="Indirizzo completo" required={true} placeholder="Inserisci indirizzo" selectChange={onChange}/>
          <ListInput
            label="N° civico"
            type="text"
            autoComplete={false}
            name="street_address_2"
            placeholder="N° civico"
            onInput={onChange}
            clearButton
            validate
          /> 
          <ListInput
            label="Nome sul campanello"
            type="text"
            autoComplete={false}
            name="name"
            placeholder="Nome sul campanello"
            onInput={onChange}
            required
            clearButton
            validate
          />

          <ListInput
            label="Telefono"
            type="number"
            autoComplete={false}
            name="phone_number"
            onInput={onChange}
            placeholder="Telefono"
            required
            clearButton
            validate
          />
          </List>
          <List>
          <ListInput
            label="Note (facoltativo))"
            type="textarea"
            autoComplete={false}
            placeholder="Note (facoltativo)"
            name="notes"
            onInput={onChange}
            clearButton
            minlength="5"
            maxlength="255"
            validate
          />
        </List>
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button large fill onClick={onSubmit} preloader loading={isLoading} className={isLoading && 'disabled'}>Aggiungi</Button>
          </Toolbar>
        </Page>
  </Popup>
  );
};

export default AddressPopup;
