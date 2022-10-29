import React, { useState, useRef } from "react";
import {
  Page,
  Navbar,
  Icon,
  Popup,
  NavLeft,
  NavTitle,
  Button,
  List,
  ListItem,
  Badge,
  BlockTitle,
  Block,
} from "framework7-react";

const InfoDepositPopup = ({ opened, close, data }) => {
  return (
    <Popup opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>{"Informazioni sul deposito #" + data?.id}</NavTitle>
        </Navbar>
        <BlockTitle>Dettagli</BlockTitle>
        <List>
          <ListItem
            title="Stato"
            after={
              data.registered ? (
                <Badge color="gray">Archiviato</Badge>
              ) : (
                <Badge color="primary">In corso</Badge>
              )
            }
          />
          <ListItem title="Creato il" after={data?.created_at} />
          <ListItem
            title="Contanti da ordini"
            after={data?.total_amount_orders + " " + data?.currency_code}
          />
          <ListItem
            title="Deposito iniziale"
            after={data?.total_amount_deposits + " " + data?.currency_code}
          />
          <ListItem
            className="text-bold text-color-primary"
            title="Totale resto"
            after={data?.total_amount_revenue + " " + data?.currency_code}
          />
        </List>
        <BlockTitle>Ordini relativi</BlockTitle>
        <List simple>
          {Array.isArray(data.ref_orders) && data.ref_orders.length > 0 ? (
            data.ref_orders.map((ref, i) => (
              <ListItem title={"#" + ref} link="#" />
            ))
          ) : (
            <Block strong>Nessun ordine</Block>
          )}
        </List>
      </Page>
    </Popup>
  );
};

export default InfoDepositPopup;
