import React, { useState } from "react";
import { Preferences } from "@capacitor/preferences";
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  Block,
  Button,
  Link,
  Card,
  f7
} from "framework7-react";
import { userLogin } from "../../actions/user";

const Login = () => {
  const [form, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  /* Input change parent state */
  const onChange = (e) => {
    e.preventDefault();
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  /*const setName = async () => {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(form),
    });
  };*/




  const setUserStorage = async (data) => {
    const userData = await Preferences.get({ key: "user" });
    //console.log('ser', JSON.parse(userData.value));
    if (userData !== undefined) {
      await Preferences.set({
        key: "user",
        value: JSON.stringify(data?.user_data),
      });
      await Preferences.set({
        key: "auth_token",
        value: data?.user_data?.token,
      });     
       await Preferences.set({
        key: "listing",
        value: JSON.stringify(data?.listing),
      });
    } else {
      console.log("user exists");
    }
  };

  const handleLogin = () => {
    //console.log('auth-form', form);
    //const isValid = f7.input.validateInputs('#loginForm');
    //f7.store.dispatch('userAuth', { form });

    setLoading(true);
    //console.log('form', form);
    // fetch user data from API
    userLogin(form)
      .then(({ data }) => {
        // assignemt to new value - REACTIVE
        setUserStorage(data);
        //console.log('returned-data-json', data);
        setLoading(false);
        //console.log("✅ return-store-data-cart", data.listing);
        f7.toast.show({
          text: "Accesso eseguito con successo",
          horizontalPosition: "center",
          closeTimeout: 2000,
        });
        f7.view.main.router.navigate('/home', {reloadAll: true });
      })
      .catch((err) => {
        console.log("🐞 error-api-user", err);
        if (err?.success === false) {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
        }
        setLoading(false);
      });
  };

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen className="v3_color_burst">
      <Card className="auth-card">
        <div className="text-align-center">
          <img
            src="https://cdn.ceebo.com/assets/images/logo.svg"
            alt="Ceebo Logo"
            className="identity_logo"
          />
        </div>
        <LoginScreenTitle>Accedi al tuo account</LoginScreenTitle>
        <List form id="loginForm" className="mb-1">
          <ListInput
            validate
            clearButton
            label="E-mail"
            type="email"
            name="email"
            placeholder="E-mail"
            onInput={onChange}
            required
          />
          <ListInput
            validate
            clearButton
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            onInput={onChange}
            required
          />
        </List>
        <Button
          fill
          large
          onClick={handleLogin}
          preloader
          loading={loading}
          className={loading && "disabled"}
        >
          Accedi
        </Button>
        <Block className="text-align-center margin-vertical">
          <Link href="/forgot-password" reloadAll={true}>
            Password dimenticata?
          </Link>
        </Block>
      </Card>
    </Page>
  );
};
export default Login;
