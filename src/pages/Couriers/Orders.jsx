import React, { useEffect, useState, useCallback } from "react";
import {
  Page,
  Navbar,
  Preloader,
  Link,
  NavTitle,
  NavLeft,
  Block,
  ListButton,
  Popover,
  List,
  ListItem,
  Icon,
  Row,
  Col,
  BlockTitle,
  Card,
  CardContent,
  CardFooter,
  f7,
} from "framework7-react";
import OrderList from "../../components/Couriers/OrderList";
import TopNav from "../../components/Couriers/TopNav";
import { getCourierOrders } from "../../actions/couriers";

const Orders = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;
  console.log('id->', id);

  const [loading, setLoading] = useState(true);
  const [data, setOrders] = useState({});

  const getData = useCallback(() => {
    getCourierOrders(id)
      .then(({ data }) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        f7.views.main.route.navigate("/couriers");
        f7.toast.show({
          text: err,
          horizontalPosition: "center",
          closeTimeout: 2000,
          cssClass: "danger",
        });
      });
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData, id]);

  return (
    <Page tabs>
      <Navbar>
        <NavLeft>
          <Link iconF7="chevron_left" href="/couriers" reloadAll={true}>
            Corrieri
          </Link>
        </NavLeft>
        <NavTitle>Ordini</NavTitle>
      </Navbar>

      {/* Navigation */}
      <TopNav url={"orders"} id={id} slot="fixed"/>
      {/* Page content starts here */}
      <BlockTitle>Riepilogo</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50" className="text-align-center">
            <p className="text-muted">Ordini completati</p>
            <h3>{data?.summary?.total_count}</h3>
          </Col>
          <Col width="50" className="text-align-center">
            <p className="text-muted">Ordini in consegna</p>
            <h3>0</h3>
          </Col>
        </Row>
      </Block>

      {loading ? <Preloader /> : <OrderList orders={data?.data} />}
    </Page>
  );
};

export default Orders;
