import React, { useState, useRef } from "react";
import {
  Page,
  Navbar,
  Icon,
  Popup,
  NavLeft,
  NavTitle,
  Toolbar,
  Button,
  List,
  ListInput,
} from "framework7-react";

const DepositPopup = ({ opened, onChange, onSubmit, close, data, isLoading }) => {



  return (
    <Popup opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>
            {data ? "Modifica deposito" : "Crea nuovo deposito"}
          </NavTitle>
        </Navbar>
        <List form noHairlinesMd id="deposit-form">
          <ListInput
            label="Importo"
            type="number"
            name="amount"
            value={data?.amount || ''}
            onInput={onChange}
            placeholder="Importo del deposito"
            min="1"
            max="999"
            clearButton
            required
            validate
          />
        </List>
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
          <Button large fill onClick={onSubmit} preloader loading={isLoading} className={isLoading && 'disabled'} type="submit">
            Salva
          </Button>
        </Toolbar>
      </Page>
    </Popup>
  );
};

export default DepositPopup;
