/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  Block,
  Link,
  NavTitle,
  NavLeft,
  NavRight,
  Preloader,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  Row,
  Col,
  Popover,
  List,
  ListItem,
  Icon,
  f7,
  BlockTitle,
} from "framework7-react";
import {
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../actions/customers";
import CustomerPopup from "../../components/Customers/CustomerPopup";
import OrderList from "../../components/Customers/OrderList";
import AddressList from "../../components/Customers/AddressList";

const View = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [form, setFormValues] = useState();

  const getData = useCallback(() => {
    getCustomer(id)
      .then(({ data }) => {
        setData(data);
        setOrders(data?.orders || []);
        setLoading(false);
      })
      .catch(() => {
        //history.replace('/customers');
        alert("error");
      });
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData, id]);

    /* Input change parent state */
    const handleOnChange = (e) => {
      setData((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value };
      });
  };
  //console.log("🌿 form-parent", form);


  /* Query update data */
  const handleSubmit = (ev) => {
    const listing_id = import.meta.env.VITE_APP_DEMO_LISTING_ID;
    updateCustomer({ ...data, listing_id })
      .then(({ data }) => {
        setEditPopup(false);
        getData();
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 1200, cssClass: 'success'});
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 1200, cssClass: 'danger'});
        }
      });
  };

  /* Handle Delete */
  const handleDelete = (id) => {
    //console.log('deleting...', id);
    deleteCustomer({ id: data.id })
      .then(({ data }) => {
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2500,
          cssClass: "success",
        });
        f7.views.main.router.navigate("/customers", { reloadAll: true });
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2500,
            cssClass: "danger",
          });
        }
      });
  };

  /* Toggle Create Popup */
  const openPopup = () => {
    setEditPopup(true);
  };
  const closePopup = () => {
    setEditPopup(false);
  };

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/customers" reloadAll={true}>
            Clienti
          </Link>
        </NavLeft>
        <NavTitle>{data.full_name}</NavTitle>
        <NavRight>
          <Link iconF7="ellipsis_circle" popoverOpen=".popover-actions"></Link>
        </NavRight>
      </Navbar>

      <Popover className="popover-actions">
        <List>
          <ListItem popoverClose title="Modifica" onClick={openPopup} link="#">
            <Icon slot="media" f7="square_pencil"></Icon>
          </ListItem>
          <ListItem
            className="text-danger"
            popoverClose
            title="Elimina"
            link="#"
            actionsOpen="#action-delete"
          >
            <Icon slot="media" f7="trash"></Icon>
          </ListItem>
          <ListItem
            popoverClose
            title="Aiuto ?"
            link="https://ceebo.tawk.help/"
            external
          >
            <Icon slot="media" f7="question_circle"></Icon>
          </ListItem>
        </List>
      </Popover>
      {/* Page content starts here */}
      <BlockTitle medium>Riepilogo</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50" className="text-align-center">
            <p className="text-muted">Totale ordini</p>
            <h3>{data.total_orders}</h3>
          </Col>
          <Col width="50" className="text-align-center">
            <p className="text-muted">Totale speso</p>
            <h3>{data.total_spent + data.currency_code}</h3>
          </Col>
        </Row>
      </Block>

      <BlockTitle medium>Ordini recenti</BlockTitle>
      {loading ? <Preloader /> : <OrderList orders={orders} />}
      <BlockTitle medium>Indirizzi</BlockTitle>
      <AddressList customerId={id} />
     <CustomerPopup 
        opened={editPopup}
        close={closePopup}
        onSubmit={handleSubmit} 
        onChange={handleOnChange}
        isLoading={loading}
        data={data}/>
      {/* Actions delete customer */}
      <Actions id="action-delete">
        <ActionsGroup>
          <ActionsLabel>Conferma elimina cliente</ActionsLabel>
          <ActionsButton onClick={handleDelete} color="red">Elimina</ActionsButton>
          <ActionsButton>Annulla</ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default View;
