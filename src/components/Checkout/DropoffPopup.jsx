import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Page,
  Navbar,
  Icon,
  Popup,
  NavRight,
  Block,
  BlockTitle,
  NavTitle,
  Button,
  List,
  ListInput,
  Row,
  Col,
  Toolbar,
  Segmented,
  f7,
} from "framework7-react";
import moment from "moment";
import OrdersMap from "../Orders/OrdersMap";

const DropoffPopup = ({ opened, close, type }) => {
  const isDelivery = type === "delivery";

  var deadline = moment();
  const five = 1000 * 60 * 5;

  const [loading, setLoading] = useState(true);
  const [minute, setMinute] = useState(deadline);
  const [activeButton, setActiveTimeButton] = useState(0);
  /* Get formatted data from state - required */
  const formatted = moment(minute).format("HH:mm");

  useEffect(() => {
    setLoading(false);
  }, [deadline]);

  /* Stepper Hour */
  const increaseMin = () => {
    setActiveTimeButton(null);
    setMinute((prev) =>
      moment(new Date(Math.round(prev / five) * five)).add(5, "minutes")
    ),
      setLoading(false);
  };
  const decreaseMin = () => {
    /* Decrease time on plus button */
    setActiveTimeButton(null);
    setMinute((prev) =>
      moment(new Date(Math.round(prev / five) * five)).subtract(5, "minutes")
    );
    setLoading(false);
  };

  /* Segmented buttonf for adding minutes*/
  const addMin = (time) => {
    setMinute(
      moment(new Date(Math.round(deadline / five) * five)).add(time, "minutes")
    );
    setActiveTimeButton(time);
    setLoading(false);
    //console.log('added another ', time);
  };
  /*
console.log('⌛ deadline time is', deadline);
console.log('-> ⌛ new deadline time is', formatted);
*/

  const onSubmit = () => {
    f7.store.dispatch("setStoreDropoff", { formatted });
    close();
  };

  return (
    <Popup opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavTitle>Seleziona orario</NavTitle>
          <NavRight>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavRight>
        </Navbar>
        <BlockTitle>Altri ordini in corso</BlockTitle>
        {isDelivery ? (
          <Block strong className="no-padding">
            <OrdersMap />
          </Block>
        ) : (
          <Block strong>La mappa non è disponibile per ordini d'asporto</Block>
        )}
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
          <Row className="margin-bottom">
            <Col width="100">
              <Segmented tag="div">
                <Button
                  outline
                  large
                  onClick={() => addMin(15)}
                  active={activeButton === 15}
                >
                  +15 min
                </Button>
                <Button
                  outline
                  large
                  onClick={() => addMin(30)}
                  active={activeButton === 30}
                >
                  +30 min
                </Button>
                <Button
                  outline
                  large
                  onClick={() => addMin(45)}
                  active={activeButton === 45}
                >
                  +45 min
                </Button>
              </Segmented>
            </Col>
          </Row>
          <Row>
            <Col width="30">
              <Segmented tag="div">
                <Button
                  large
                  outline
                  onClick={decreaseMin}
                  className={minute.isSameOrAfter(deadline) ? "" : "disabled"}
                >
                  <Icon f7="minus"></Icon>
                </Button>
                <Button large outline preloader loading={loading}>
                  {formatted}
                </Button>
                <Button large outline onClick={increaseMin}>
                  <Icon f7="plus"></Icon>
                </Button>
              </Segmented>
            </Col>
            <Col width="70">
              <Button fill large onClick={onSubmit}>
                Conferma orario
              </Button>
            </Col>
          </Row>
        </Toolbar>
      </Page>
    </Popup>
  );
};

export default DropoffPopup;
