import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  BlockFooter,
  Link,
  NavTitle,
  NavLeft,
  NavRight,
  Row,
  Col,
  Button,
  Popover,
  List,
  ListItem,
  Icon,
  Badge,
  f7
} from "framework7-react";
import InfoPopup from "../../components/Orders/InfoPopup";
import { getOrder, withdrawOrder } from "../../actions/orders";


const View = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [order, setOrder] = useState({});
  const [popupContact, setPopupContact] = useState(false);

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



    /* Toggle Create Popup */
    const openPopup = () => {
      setPopupContact(true);
    }
    const closePopup = () => {
      setPopupContact(false);
    }


    /* Handle Delete */
    const handleWithdrawOrder = (id) => {
      //console.log('cofirmed', id);
      f7.dialog.create({
        title: "Conferma ordine ritirato",
        text: "Segnare l'ordine come ritirato?",
        buttons:[
          {
            text: 'Annulla',
          },
          {
            text: 'Conferma',
            onClick: function() {
              /* order withdraw */
              withdrawOrder({
                id: id,
              }).then(({ data }) => {
                console.log(data);
                f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2000, cssClass: 'success'});
                /* redirect */
                f7router.navigate('/pickup', {reloadAll: true });
              }).catch((err) => {
                if (err?.message) {
                  f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2000, cssClass: 'danger'});
                }
              })
            }
          }
        ],
        closeByBackdropClick: true
      }).open();
    };


  return (
    <Page>
      <InfoPopup opened={popupContact} close={closePopup} data={order.dropoff ? order.dropoff : null}/>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/pickup" reloadAll>
            Indietro
          </Link>
        </NavLeft>
        <NavTitle>{"Dettaglio ordine #" + order.id}</NavTitle>
      </Navbar>
       {/* Page content starts here */}
       <BlockTitle medium>{'#'+order.id}</BlockTitle>
      <Block strong>
        <h3 className="text-muted">{'Ordine creato il '+order.created_at ? order.created_at : null}</h3>
        <Badge style={{ background: order.status_color }}>{order.status}</Badge>
        <span><Badge>{order.type}</Badge></span>
      </Block>
       {/* Order Customer */}
       <BlockTitle>Cliente</BlockTitle>
      <List mediaList>
          <ListItem
            title={order.dropoff ? order.dropoff.name : ""}
            subtitle={order.dropoff ? order.dropoff.phone_number : ""}
          />
           <ListItem
            title="Creato"
            after={order.created_at}
          />
           <ListItem
            title="Orario di consegna"
            after={order.dropoff_deadline ? order.dropoff_deadline : null}
          />
          <ListItem
            title="NOTE"
            subtitle={order.dropoff ? order.dropoff.notes : null}
          />
        </List>
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
                  <span slot="media">
                    {item.qty+'x'}
                  </span>
                </ListItem>
                {item.variants.length > 0 ? (
                  <li>
                    <ul>
                      {item.variants.map(({ per_item, name }, v) => {
                        return (
                          <ListItem className="item-modifier" key={v} title={`${per_item}x ${name}`} />
                        );
                      })}
                    </ul>
                  </li>
                ) : null}
                {item.special_instructions ? (
                  <li>
                    <ul>
                      <ListItem title="Istruzioni speciali:" />
                      <ListItem className="item-modifier" title={item.special_instructions} />
                    </ul>
                  </li>
                ) : null}
              </li>
            ))
          ) : (
            <Block strong>Nessun prodotto</Block>
          )}
        </List>

        {/* Overview order */}
        <List>
          <ListItem
            title="Subtotale"
            after={
              order.subtotal_price
                ? order.subtotal_price + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            title="Spese di servizio"
            after={
              order.purchase_fee
                ? order.purchase_fee + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            title="Spese di consegna"
            after={
              order.delivery_fee
                ? order.delivery_fee + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            className="text-bold"
            title="Totale"
            after={
              order.total_price
                ? order.total_price + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            className="text-bold"
            title={order.status_id <= 6 && order.payment_method === 'cash' ? 'Da pagare ' : 'Pagato con '}
            after={order.payment_method === "cash" ? (
              <Icon f7="money_euro_circle"></Icon>
             ) : (
               <Icon f7="creditcard"></Icon>
             )}
          />
        </List>

      {/* CTA order actions */}
      <BlockTitle>Ordine già confermato, serve aiuto?</BlockTitle>
      <Block strong>
        <Row>
        <Col width="100" medium="50">
            <Button outline large onClick={openPopup}>Contatta cliente</Button>
          </Col>
          <Col width="100" medium="50">
            <Button fill large onClick={(e) => handleWithdrawOrder(order.id)}>Ordine ritirato</Button>
          </Col>
        </Row>
      </Block>
    </Page>
  );
};

export default View;
