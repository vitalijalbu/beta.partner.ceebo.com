import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Preloader,
  Link,
  Searchbar,
  f7
} from "framework7-react";
import { getAllCouriers, createCourier } from "../../actions/couriers";
import CourierList from "../../components/Couriers/CourierList";
import CourierPopup from "../../components/Couriers/CourierPopup";

const Couriers = () => {
  const [loading, setLoading] = useState(true);
  const [couriers, setCouriers] = useState([]);
  const [popup, setPopup] = useState(false);
  const [form, setFormValues] = useState({});

  console.log('data-form', form);


  const getCouriers = useCallback((query) => {
    getAllCouriers()
      .then(({ data }) => {
        setCouriers(data?.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getCouriers();
  }, [getCouriers]);


  /* Input change parent state */
  const handleOnChange = (e) => {
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  
  

  /* Query create data */
  const handleSubmit = (e) => {
    e.preventDefault();
    const listing_id = import.meta.env.VITE_APP_DEMO_LISTING_ID;
    createCourier({ ...form, listing_id })
      .then(({ data }) => {
        setPopup(false);
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
        getCouriers();
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'danger'});
        }
      }).finally(() => {
        setLoading(false);
      });
  };

  /* Toggle Create Popup */
  const openPopup = () => {
    setPopup(true);
  }
  const closePopup = () => {
    setPopup(false);
    setFormValues({});
  }

    
  return (
    <Page>
      <CourierPopup 
        opened={popup}
        close={closePopup}
        onSubmit={handleSubmit} 
        isLoading={loading}
        data={form}
        onChange={handleOnChange}/>
      <Navbar>
        <NavTitle>Corrieri</NavTitle>
        <NavRight>
          <Link href="#" iconF7="plus" onClick={openPopup}></Link>
        </NavRight>
      </Navbar>
      {loading ? <Preloader /> : <CourierList couriers={couriers} />}
    </Page>
  );
};

export default Couriers;
