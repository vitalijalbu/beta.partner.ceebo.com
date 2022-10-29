import React from "react";
import {
  Page,
  Block,
  BlockTitle,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  List,
  ListItem,
  Icon
} from "framework7-react";


const Navigation = [
  {
    id: 'account',
    title: 'Account',
    links: [
      {
        exact: true,
        label: 'Il mio account',
        url: '/settings/account',
        icon: 'person_crop_circle'
      },
      {
        exact: true,
        label: 'Piano',
        url: '/settings/billing',
        icon: 'money_euro_circle'
      },
      {
        exact: false,
        label: 'Il mio ristorante',
        url: '/settings/listing',
        icon: 'map_pin_ellipse'
      },
      {
        exact: false,
        label: 'Zone di consegna',
        url: '/settings/areas',
        icon: 'skew'
      },
    ],
  },
  {
    id: 'Hardware',
    title: 'Hardware',
    links: [
      {
        label: 'Stampante',
        url: '/settings/hardware',
        icon: 'printer'
      },
    ],
  },
  {
    id: 'other',
    title: 'Altro',
    links: [
      {
        label: 'Assistenza',
        url: '/settings/support',
        icon: 'question_circle'
      }
    ]
  }
];


const Settings = () => (
  <Page>
    <Navbar title="Impostazioni">
    </Navbar>
    {Navigation.map((nav, i) => (
      <>
        <BlockTitle key={i}>{nav.title}</BlockTitle>
            <List id={nav.id} key={i}>
              {nav.links.map((link, l) =>
                link.external === true ? (
                  <ListItem title={link.label} href="#" onClick={link.onClick} key={l}>
                   <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                ) : link.action ? (
                  <ListItem title={link.label} href={link.url} key={l}>
                    <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                ) : (
                  <ListItem title={link.label} href={link.url} key={l}>
                    <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                )
              )}
            </List>
            </>
      ))}
      <BlockTitle>Disconnetti</BlockTitle>
                <List>
                  <ListItem title="Logout" href="#" className="color-red">
                   <Icon slot="media" f7="arrow_turn_down_right"></Icon>
                  </ListItem>
            </List>
  </Page>
);

export default Settings;
