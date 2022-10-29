import React, { useState } from "react";
import {
  f7,
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  Block,
  Button,
  Card,
  Link,
} from "framework7-react";
import { forgotPassword } from "../../actions/user";

const ForgotPassword = ({ f7router }) => {
  const [form, setFormValues] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Input change parent state */
  const onChange = (e) => {
    e.preventDefault();
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setLoading(true);
    forgotPassword({ ...form })
      .then((data) => {
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2500,
          cssClass: "success",
        });
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen className="v3_color_burst">
      <Card className="auth-card">
        <LoginScreenTitle>Recupera password</LoginScreenTitle>
        <List form id="loginForm" className="mb-1">
          <ListInput
            label="E-mail"
            type="email"
            name="email"
            placeholder="Indirizzo e-mail"
            value={form?.email || ""}
            onInput={onChange}
          />
        </List>
        <Button
          fill
          large
          onClick={handleForgot}
          preloader
          loading={loading}
          className={loading && "disabled"}
        >
          Recupera password
        </Button>
        <Block className="text-align-center margin-vertical">
          <Link href="/login" reloadAll={true}>
            Torna al login
          </Link>
        </Block>
      </Card>
    </Page>
  );
};

export default ForgotPassword;
