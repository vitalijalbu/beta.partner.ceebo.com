import React, { useState, useEffect, useCallback } from 'react';
import { Page, Navbar, Block, Preloader } from 'framework7-react';
import { getAvailabilities } from '../../../actions/items';
import SectionList from '../../../components/Menu/Availabilities/SectionList';
import MediaList from '../../../components/Menu/Availabilities/MediaList';

const Availabilities = () => {
  const [loading, setLoading] = useState(true);
  const [data, setItems] = useState([]);
  /*const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )*/

  const handleAvailabilities = useCallback(() => {
      //window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches( e.matches ));
      getAvailabilities()
      .then(({ data }) => {
        setItems(data ? data : []);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);

  useEffect(() => {
    //window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches( e.matches ));
    handleAvailabilities();
  }, []);

  const handleUpdate = () => {
    //isChanged.current = true;
    handleAvailabilities();
  };
  /*
   {matches ? (<SectionList data={section} key={section.id} />) : <MediaList data={section} key={section.id} />}
   */

  return (
  <Page>
      <Navbar title="Disponibilità"></Navbar>
      {loading ? (
          <Preloader/>
        ) : (
          <Block>
            {data.map((section) => (
                 <SectionList data={section} key={section.id} onUpdate={handleAvailabilities}/>
            ))}
          </Block>
        )}
  </Page>
);
}

export default Availabilities;
