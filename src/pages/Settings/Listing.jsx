import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavTitle, NavLeft, Preloader, Link, Block, List, ListItem, BlockTitle, useStore, f7 } from 'framework7-react';
import ListingList from '../../components/Settings/ListingList';
import { getAllListings } from '../../actions/listings';

const Listing = () => {

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings()
      .then(({ data }) => {
        setListings(data ? data : []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <Page>
       <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/settings" reloadAll={true}>
            Impostazioni
          </Link>
        </NavLeft>
        <NavTitle>Il mio ristorante</NavTitle>
      </Navbar>
      {loading ? <Preloader /> : <ListingList listings={listings} />}
    </Page>
  );
}

export default Listing;

