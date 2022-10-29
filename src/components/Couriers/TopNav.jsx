import React from 'react';
import {
  Link,
  Toolbar
} from "framework7-react";

const TopNav = ({ id, url }) => {
  return (
    <Toolbar tabbar top inner={true} slot="fixed">
      <Link href={'/couriers/'+id} tabLinkActive={url === 'details'}>
        Dettagli
      </Link>
      <Link href={'/couriers/'+id+'/orders'} tabLinkActive={url === 'orders'}>
        Ordini 
      </Link>
      <Link href={'/couriers/'+id+'/deposits'} tabLinkActive={url === 'deposits'}>
        Depositi
        </Link>
    </Toolbar>
  );
};

export default TopNav;
