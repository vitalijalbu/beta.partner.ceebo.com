import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  Block,
  Link,
  NavTitle,
  NavLeft,
  NavRight,
  ListButton,
  Popover,
  List,
  ListItem,
  Icon,
  Toggle,
  Row,
  Col,
  BlockTitle,
  Card,
  CardContent,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  f7,
} from "framework7-react";
import {
  getCourier,
  updateCourier,
  deleteCourier,
} from "../../actions/couriers";
import CourierPopup from "../../components/Couriers/CourierPopup";
import OrderList from "../../components/Couriers/OrderList";
import TopNav from "../../components/Couriers/TopNav";

const View = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [pending_orders, setOrders] = useState({});
  const [editPopup, setEditPopup] = useState(false);
  const [form, setFormValues] = useState();

  const getData = useCallback(() => {
    getCourier(id)
      .then(({ data }) => {
        setData(data);
        setOrders(data?.pending_orders || []);
        setLoading(false);
      })
      .catch(() => {
        //history.replace('/couriers');
        alert("error");
      });
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData, id]);

  /* Toggle Create Popup */
  const openPopup = () => {
    setEditPopup(true);
  };
  const closePopup = () => {
    setEditPopup(false);
  };

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
    updateCourier({ ...data, listing_id })
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

  /* Toggle edit */
  const toggleStatus = () => {
    const update_data = {
      'id': data.id,
      'online': !data.online
    }
    updateCourier(update_data)
      .then(({ data }) => {
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
      })
      .catch((err) => {
        f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'danger'});
      });
  };
  /* Handle Delete */
  const handleDelete = (id) => {
    console.log('deleting...', id);
    deleteCourier({ id: data.id })
      .then(({ data }) => {
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2500,
          cssClass: "success",
        });
        f7.views.main.router.navigate("/couriers", { reloadAll: true });
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
  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/couriers" reloadAll={true}>
            Corrieri
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
      
     {/* Navigation */}
     <TopNav url={"details"} id={id} slot="fixed"/>
      {/* Page content starts here */}
      <Row>
        <Col width="50" large="50" small="100">
          <BlockTitle>Ordini</BlockTitle>
          <Card outline>
            <CardContent padding={false}>
              <List noChevron={true}>
              <ListItem>
                <span>Attivo?</span>
                <Toggle defaultChecked={data.online} color="green" onChange={() => toggleStatus()}></Toggle>
              </ListItem>
                <ListItem
                  title="Ordini in corso"
                  link="#"
                  after={data.total_pending_orders}
                ></ListItem>
                <ListItem
                  title="Ordini completati"
                  link="#"
                  after={data.id}
                ></ListItem>
                <ListItem
                  title="Prima consegna"
                  link="#"
                  after={data.time_fist_order ? data.time_fist_order : "-"}
                ></ListItem>
                <ListItem
                  title="Ultima consegna"
                  link="#"
                  after={data.time_last_order ? data.time_last_order : "-"}
                ></ListItem>
                <ListButton title="Vedi tutti gli ordini" href={'/couriers/'+id+'/orders'} />
              </List>
              </CardContent>
              </Card>
        </Col>
        <Col width="50" large="50" small="100">
          <BlockTitle>Depositi</BlockTitle>
          <Card outline> 
            <CardContent padding={false}>
              <List noChevron={true}>
                <ListItem
                  title="Data"
                  link="#"
                  after={data.deposits ? data.deposits.date : "-"}
                ></ListItem>
                <ListItem
                  title="Totale dovuto da ordini"
                  link="#"
                  after={
                    data.deposits
                      ? data.deposits?.total_amount_orders +
                        data.deposits?.currency_code
                      : "0,00"
                  }
                ></ListItem>
                <ListItem
                  title="Totale depositi"
                  link="#"
                  after={
                    data.deposits
                      ? data.deposits?.total_amount_revenue +
                        data.deposits?.currency_code
                      : "0,00"
                  }
                ></ListItem>
                <ListButton title="Vedi depositi" href={'/couriers/'+id+'/deposits'} />
              </List>
              </CardContent>
          </Card>
        </Col>
      </Row>
      <BlockTitle>Ordini in consegna</BlockTitle>
      <OrderList orders={pending_orders} />
      {/* Actions delete customer */}
      <Actions id="action-delete">
        <ActionsGroup>
          <ActionsLabel>Conferma elimina corriere</ActionsLabel>
          <ActionsButton onClick={handleDelete} color="red">Elimina</ActionsButton>
          <ActionsButton>Annulla</ActionsButton>
        </ActionsGroup>
      </Actions>
      <CourierPopup
       opened={editPopup}
       close={closePopup}
       onSubmit={handleSubmit} 
       onChange={handleOnChange}
       isLoading={loading}
       data={data}/>
    </Page>
  );
};

export default View;
