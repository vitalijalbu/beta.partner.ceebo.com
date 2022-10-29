import React, { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Panel,
  List,
  ListItem,
  Icon,
  Button,
  BlockTitle,
  BlockFooter,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  f7,
  useStore
} from "framework7-react";
import StatusPopup from "./StatusPopup";
import { Home, Bike, ShoppingBag, Food } from '../../utilities/Icons/';
import Footer from './Footer';
const Navigation = [
  {
    id: 'Generale',
    title: 'Generale',
    links: [
      {
        label: 'Home',
        slug: 'home',
        url: '/dashboard?archived=false',
        icon: <Home/>
      },
      {
        label: 'Ordini',
        slug: 'orders',
        url: '/orders?archived=true',
        icon: 'tray'
      },
      {
        label: 'Corrieri',
        slug: 'couriers',
        url: '/couriers',
        icon: <Bike/>
      },
      {
        label: 'Clienti',
        slug: 'customers',
        url: '/customers',
        icon: 'person_crop_circle'
      },
      {
        label: 'Disponibilità',
        slug: 'availabilities',
        url: '/availabilities',
        icon: <Food/>
      },
      {
        label: 'Analisi',
        slug: 'reports',
        url: '/reports',
        icon: 'chart_bar'
      }
    ],
  },
  {
    id: 'other',
    title: 'Altro',
    links: [
      {
        label: 'Impostazioni',
        slug: 'settings',
        url: '/settings',
        icon: 'slider_horizontal_3'
      },
      {
        label: 'Assistenza',
        slug: 'support',
        url: '/settings/support',
        icon: 'question_circle'
      }
    ],
  }
];


const Menu = (props) => {
  const url = f7.view.main.router.currentRoute.name;
  const [popupStatus, setPopupStatus] = useState(false);


  
  const openPopup = () => {
    setPopupStatus(true);
  };
  const closePopup = () => {
    setPopupStatus(false);
  };

  /* User logout clear storage */
  const handleLogout = async () => {
    await Preferences.clear();
    f7.view.main.router.navigate('/login', {reloadAll: true });
  };

  /*
  useEffect(() => {
    setSelected(url);
  }, [url]);
  
  */
  return (
      <Panel right cover id="panel-menu" containerEl="panel-menu" opened={props.opened} onPanelClose={props.close}>
        <Page>
        <StatusPopup opened={popupStatus} close={closePopup}/>
        <Navbar><NavLeft><Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button></NavLeft><NavTitle>Menu</NavTitle></Navbar>
        {Navigation.map((nav, i) => (
      <>
            <List menuList id={nav.id}>
              {nav.links.map((link, l) =>
                link.external === true ? (
                  <ListItem key={l} title={link.label} href={link.url} onClick={link.onClick} panelClose>
                   <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                ) : link.action ? (
                  <ListItem key={l} title={link.label} href={link.url} selected={url === link.slug} reloadAll={true} panelClose>
                    <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                ) : (
                  <ListItem key={l} title={link.label} href={link.url} selected={url === link.slug} reloadAll={true} panelClose>
                    <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                )
              )}
            </List>
            </>
      ))}
      <BlockTitle>Pausa ristorante</BlockTitle>
        <List menuList>
          <ListItem link="#" key="01" title="Stato ristorante" onClick={openPopup}>
             <Icon slot="media" f7="pause_circle"></Icon>
          </ListItem>
        </List>
        <BlockFooter>Attivando la puasa non riceverai nuovi ordini dal menu online finche non la disattiverai
      </BlockFooter>
      <List menuList>
          <ListItem link="#" key="011" title="Esci" actionsOpen="#action-logout" color="red" panelClose>
          <Icon slot="media" f7="arrow_left_to_line"></Icon>
          </ListItem>
        </List>
        </Page>
              {/* Actions delete customer */}
      <Actions id="action-logout">
        <ActionsGroup>
          <ActionsLabel>L'operazione sarà valida solo per questo account e l'accesso ai tuoi altri account verrà mantenuto.</ActionsLabel>
          <ActionsButton onClick={handleLogout} color="red">Esci</ActionsButton>
          <ActionsButton>Annulla</ActionsButton>
        </ActionsGroup>
      </Actions>
    </Panel>
  );
};

export default Menu;
