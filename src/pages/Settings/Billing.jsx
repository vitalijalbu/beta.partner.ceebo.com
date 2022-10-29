import React, { useState, useEffect } from 'react';
import { Page,  Navbar, NavTitle, NavLeft, ListButton, Preloader, Link, Block, List, ListItem, BlockTitle } from 'framework7-react';


const Billing = () => {

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/settings" reloadAll={true}>
            Impostazioni
          </Link>
        </NavLeft>
        <NavTitle>Il mio piano</NavTitle>
      </Navbar>

      <BlockTitle>Lista fatture</BlockTitle>
        <List>
        <ListItem title="Piano" link="#" after="Pro 60€/mese"></ListItem>
        <ListItem title="Inizio abbonamento" link="#" after="20/05/2022"></ListItem>
        <ListItem title="Prossimo rinnovo" link="#" after="20/06/2022"></ListItem>
        </List>
        <List>
      <ListButton external target="_blank" href="https://partner.ceebo.com/settings/billing">Cambia piano</ListButton>
    </List>
    </Page>
  );
}

export default Billing;

