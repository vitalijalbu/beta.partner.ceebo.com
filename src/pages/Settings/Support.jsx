import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavTitle, NavLeft, Link, List, ListItem, BlockTitle } from 'framework7-react';


const Support = () => {

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/settings" reloadAll={true}>
            Impostazioni
          </Link>
        </NavLeft>
        <NavTitle>Assistenza</NavTitle>
      </Navbar>
      <BlockTitle>Azioni</BlockTitle>
        <List>
        <ListItem title="Chiamaci" link="#" after="+390023992"></ListItem>
        <ListItem title="Contattaci" link="mailto:support@ceebo.com?subject=Assistenza" external after="support@ceebo.com"></ListItem>
        </List>
    </Page>
  );
}

export default Support;

