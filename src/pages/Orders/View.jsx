import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  NavTitle,
  NavLeft,
  NavRight,
  Preloader,
  Toolbar,
  Popover,
  List,
  ListItem,
  Badge,
  Icon,
} from "framework7-react";
import { getOrder } from "../../actions/orders";

const View = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [order, setOrder] = useState({});

  useEffect(() => {
    setLoading(true);
    getOrder(id)
      .then(({ data }) => {
        setLoading(false);
        setOrder(data);
      })
      .catch(() => {
        history.goBack();
      });
  }, [id]);


  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link reloadAll iconF7="chevron_left" href="/orders">
            Ordini
          </Link>
        </NavLeft>
        <NavTitle>{"Dettaglio ordine #" + order.id}</NavTitle>
        <NavRight>
          <Link iconF7="ellipsis_circle" popoverOpen=".popover-actions"></Link>
        </NavRight>
      </Navbar>
      <Popover className="popover-actions">
        <List noHairlinesBetween>
          <ListItem popoverClose title="Modifica" onClick="" link="#">
            <Icon slot="media" f7="square_pencil"></Icon>
          </ListItem>
          <ListItem
            className="text-danger"
            popoverClose
            title="Stampa ricevuta"
            onClick={(e) => alert(data.id)}
            link="#"
          >
            <Icon slot="media" f7="trash"></Icon>
          </ListItem>
          <ListItem popoverClose external title="Aiuto" link="#">
            <Icon slot="media" f7="question_circle"></Icon>
          </ListItem>
        </List>
      </Popover>
      <Popover className="popover-actions">
        <List>
          <ListItem link="#" popoverClose title="Modifica ordine" />
          <ListItem
            link="#"
            popoverClose
            title="Stampa ricevuta"
            icon="trash"
          />
          <ListItem link="#" popoverClose title="Aiuto?" external />
        </List>
      </Popover>
      {/* Page content starts here */}
      
      {/* Order Customer */}
      <BlockTitle>Cliente</BlockTitle>
        <List mediaList noChevron>
          <ListItem
            title={order.dropoff ? order.dropoff.name : ""}
            subtitle={order.dropoff ? order.dropoff.phone_number : ""}
            text={order.dropoff ? order.dropoff.formatted_address : ""}
          >
            <img
              slot="media"
              src={
                order.dropoff
                  ? order.dropoff.image_url
                  : "https://cdn.ceebo.com/assets/images/avatar.png"
              }
            />
          </ListItem>
          {order.area_name && <ListItem title="Riferimento zona" subtitle={order.area_name}/>}
          {order.notes && <ListItem title="Note" subtitle={order.notes}/>}
          <ListItem title="Stato ordine" subtitle={<Badge style={{ background: order.status_color }}>{order.status}</Badge>}  />
        </List>

      {!!order.courier ? (
        <>
          <BlockTitle>Rider</BlockTitle>
            <List mediaList>
              <ListItem
                title={order.courier ? order.courier.full_name : null}
                subtitle={order.courier ? order.courier.phone_number : null}
                text={order.courier ? order.courier.status : null}
              >
                <img
                  slot="media"
                  src={
                    order.dropoff
                      ? order.dropoff.image_url
                      : "https://cdn.ceebo.com/assets/images/avatar.png"
                  }
                />
              </ListItem>
            </List>
        </>
      ) : null}

      {/* Order Items */}
      <BlockTitle>Piatti</BlockTitle>
        <List noChevron>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, i) => (
              <li>
                <ListItem
                  key={i}
                  title={item.name}
                  after={item.unit_price + " " + item.currency_code}
                >
                  <span slot="media" icon="demo-list-icon">
                    1x
                  </span>
                </ListItem>
                {item.variants.length > 0 ? (
                  <li>
                    <ul className="item-modifiers">
                      {item.variants.map(({ per_item, name }, v) => {
                        return (
                          <ListItem noHairlines key={v} title={`${per_item}x ${name}`} />
                        );
                      })}
                    </ul>
                  </li>
                ) : null}
                {item.special_instructions ? (
                  <li>
                    <ul className="item-modifiers">
                      <ListItem title="Istruzioni speciali" />
                      <ListItem title={item.special_instructions} />
                    </ul>
                  </li>
                ) : null}
              </li>
            ))
          ) : (
            <p>Nessun prodotto</p>
          )}
        </List>

        {/* Overview order */}
        <List>
          <ListItem
            title="Subtotale"
            after={
              order.subtotal_price
                ? order.subtotal_price + " " + order.currency_code
                : "0,00 " + order.currency_code 
            }
          />
          <ListItem
            title="Spese di servizio"
            after={
              order.purchase_fee
                ? order.purchase_fee + " " + order.currency_code
                : "0,00 " + order.currency_code 
            }
          />
          <ListItem
            title="Spese di consegna"
            after={
              order.delivery_fee
                ? order.delivery_fee + " " + order.currency_code
                : "0,00 " + order.currency_code 
            }
          />
          <ListItem
            className="text-bold"
            title="Totale"
            after={
              order.total_price
                ? order.total_price + " " + order.currency_code
                : "0,00 " + order.currency_code 
            }
          />
        </List>
    </Page>
  );
};

export default View;
