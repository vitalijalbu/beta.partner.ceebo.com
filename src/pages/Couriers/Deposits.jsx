import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Page,
  Navbar,
  Preloader,
  Link,
  NavTitle,
  NavLeft,
  ListButton,
  List,
  ListItem,
  BlockTitle,
  Card,
  CardContent,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  f7,
} from "framework7-react";
import TopNav from "../../components/Couriers/TopNav";
import {
  getDeposits,
  createDeposit,
  registerDeposit,
  updateDeposit,
  deleteDeposit,
} from "../../actions/couriers";
import DepositPopup from "../../components/Couriers/DepositPopup";
import DepositList from "../../components/Couriers/DepositList";

const Deposits = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [deposits, setDeposits] = useState([]);
  const [depositPopup, setDepositPopup] = useState(false);
  const [form, setFormValues] = useState({});

  const isChanged = useRef(false);

  const handleDeposits = useCallback(() => {
    getDeposits(id)
      .then(({ data }) => {
        setData(data);
        setDeposits(data?.data || []);
        setLoading(false);
        //console.log("🌿 success-get-deposits-api", data);
      })
      .catch(() => {
        console.log("🚫 error-deposits-api");
      });
  }, [id]);

  useEffect(() => {
    handleDeposits();
  }, [id]);

  /* Input change parent state */
  const handleOnChange = (e) => {
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  /* Toggle Create Popup */
  const openPopup = () => {
    setDepositPopup(true);
  };
  const closePopup = () => {
    setDepositPopup(false);
  };

  /* Create New Deposit */
  const handleCreateDeposit = (e) => {
    createDeposit({ ...form, id })
      .then(({ data }) => {
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2500,
          cssClass: "success",
        });
        closePopup();
        handleDeposits();
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



  /* Function to register deposit */
  const handleRegisterDeposit = useCallback(
    (depositId) => {
      registerDeposit(id, { courier_id: id })
        .then(({ data }) => {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "success",
          });
          handleDeposits();
        })
        .catch((err) => {
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
        });
    },
    [id]
  );

  const handleUpdate = () => {
    //isChanged.current = true;
    handleDeposits();
  };

  console.log("🌿 form", form);
  return (
    <Page>
      <Navbar inner={true}>
        <NavLeft>
          <Link iconF7="chevron_left" href="/couriers" reloadAll={true}>
            Corrieri
          </Link>
        </NavLeft>
        <NavTitle>Depositi</NavTitle>
      </Navbar>
      {/* Navigation */}
      <TopNav url={"deposits"} id={id} slot="fixed"/>
      {/* Page content starts here */}
      <Card outline className="banner info">
        <CardContent>
          <h3>Ricordati a fine turno di registrare i depositi</h3>
          <p className="text-muted">
            Registrando i depositi segnerai che il rider ha consegnato l’intera
            somma raccolta dagli ordini in contanti più il resto segnato.
          </p>
        </CardContent>
      </Card>
      <BlockTitle>Riepilogo</BlockTitle>
      {/* Overview order */}
      <List>
        <ListItem title="Ordini consegnati" after={data?.delivered_orders} />
        <ListItem
          title="Contanti da ordini"
          after={data?.total_amount_orders + " " + data?.currency_code}
        />
        <ListItem
          title="Deposito iniziale"
          after={data?.total_amount_deposits + " " + data?.currency_code}
        />
        <ListItem
          className="text-bold"
          title="Totale resto"
          after={data?.total_amount_revenue + " " + data?.currency_code}
        />
        <ListButton
          onClick={openPopup}
          className={data.register ? "disabled" : ""}
        >
          Aggiungi deposito
        </ListButton>
        <ListButton
          color="red"
          className={data.register ? "" : "disabled"}
          actionsOpen="#action-archive"
        >
          Archivia i depositi
        </ListButton>
      </List>
      {loading ? (
        <Preloader />
      ) : (
        <DepositList data={deposits} onUpdate={handleUpdate} />
      )}
      <DepositPopup
        close={closePopup}
        opened={depositPopup}
        isLoading={loading}
        onSubmit={handleCreateDeposit}
        data={form}
        onChange={handleOnChange}
      />
      {/* Actions buttons */}
      <Actions id="action-archive">
        <ActionsGroup>
          <ActionsLabel>Archivia i depositi aperti</ActionsLabel>
          <ActionsButton onClick={handleRegisterDeposit}>
            Archivia depositi
          </ActionsButton>
          <ActionsButton color="red">Annulla</ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default Deposits;
