import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavTitle, NavLeft, Preloader, Link, Block, List, ListItem, BlockTitle } from 'framework7-react';


const Account = () => {
  const [delivery_areas, setAreas] = useState([]);

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/settings" reloadAll={true}>
            Impostazioni
          </Link>
        </NavLeft>
        <NavTitle>Il mio account</NavTitle>
      </Navbar>
      <BlockTitle>Azioni</BlockTitle>
        <List>
        <ListItem title="Account ID" link="#" after="#1000"></ListItem>
        <ListItem title="Modifica account" link="mailto:partner@ceebo.com?subject=Modifica dati profilo" external></ListItem>
        <ListItem title="Modifica password" link="/settings/security"></ListItem>
        <ListItem className="text-danger" title="Disattiva account" link="mailto:partner@ceebo.com?subject=Disattiva account" external></ListItem>
        </List>
    </Page>
  );
}

export default Account;

