import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavTitle, NavLeft, Preloader, Link, Block, BlockTitle, List, ListItem, Toggle } from 'framework7-react';
import { getDeliveryAreas } from '../../actions/listings';
import AreaList from '../../components/Settings/AreaList';

const Areas = () => {
  const [loading, setLoading] = useState(true);
  const [delivery_areas, setAreas] = useState([]);
  const [summary, setSummary] = useState([]);

  
  useEffect(() => {
    getDeliveryAreas()
      .then(({ data }) => {
        setAreas(data?.data || []);
        //console.log(delivery_areas);
        //setSummary(data?.summary || {});
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
        <NavTitle>Zone di consegna</NavTitle>
      </Navbar>
      {loading ? (
            <Preloader/>
          ) : (
            <AreaList areas={delivery_areas}/>
          )}
    </Page>
  );
}

export default Areas;

