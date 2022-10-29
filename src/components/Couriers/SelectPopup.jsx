import React, { useState, useEffect, useCallback } from 'react';
import {
  Page,
  Navbar,
  Popup,
  NavLeft,
  NavTitle,
  Icon,
  Chip,
  List,
  ListItem,
  Toolbar,
  Button,
  BlockTitle
} from 'framework7-react';
import { getAllCouriers } from '../../actions/couriers';


const SelectPopup = ({ opened, close, setCourier, onSubmit, tot_ref }) => {
    const [loading, setLoading] = useState(true);
    const [couriers, setCouriers] = useState([]);
    const [selected, setSelected] = useState();

    /* Query get */
    const getCouriers = useCallback(() => {
        getAllCouriers()
          .then(({ data }) => {
            setCouriers(data?.data || []);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
    
      useEffect(() => {
        getCouriers();
      }, [getCouriers]);

      const handleSubmit = () => {
        //setCourier(selected);
        onSubmit(selected);
        //close();
      }
      

      

  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
             <NavLeft>
              <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>Seleziona rider</NavTitle>
          </Navbar>
          <BlockTitle>{'Ordini selezionati - ' + tot_ref}</BlockTitle>
          <List mediaList>
                {couriers.map((data, i) => (
                <ListItem 
                radio
                value={data.id}
                key={data.id}
                name="select-courier"
                mediaItem={true}
                className={data.online ? "" : "disabled"}
                media={data.image_url}
                onChange={(e) => setSelected(data.id)}
                header={data?.time_last_order ? 'Ultima consegna ' + data.time_last_order : 'Ultima consegna -'}
                title={data.full_name} subtitle={data.total_orders} text={<Chip outline text={data.status} color="blue" />}/>
                ))}
            </List>
            <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button large fill disabled={!selected} onClick={handleSubmit}>Invia ordini</Button>
          </Toolbar>
        </Page>
  </Popup>
  );
};

export default SelectPopup;
