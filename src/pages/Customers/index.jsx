import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Page,
  Navbar,
  Subnavbar,
  NavLeft,
  NavRight,
  NavTitle,
  Preloader, Link, Searchbar, f7
} from "framework7-react";
import { getAllCustomers, createCustomer } from '../../actions/customers';
import CustomerList from '../../components/Customers/CustomerList';
import CustomerPopup from "../../components/Customers/CustomerPopup";



const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [popup, setPopup] = useState(false);
  const [query, setQuery] = useState('');
  const [form, setFormValues] = useState({});

  //console.log('data-form', form);
  /* Query get data */
  const getCustomers = useCallback((query) => {
    getAllCustomers(query)
      .then(({ data }) => {
        setCustomers(data?.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getCustomers(query);
  }, [getCustomers, query]);

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
    createCustomer({ ...form, listing_id })
      .then(({ data }) => {
        getCustomers();
        setFormValues('');
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
        setPopup(false);
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'danger'});
        }
      })
      .finally((data) => {
        setLoading(false);
      });
  };
  /* Toggle Create Popup */
  const openPopup = () => {
    setPopup(true);
  }
  const closePopup = (e) => {
    setPopup(false);
    setFormValues({});
  }



  return(
    <Page>
      <Navbar>
      <NavLeft>
      <Link href="#" iconF7="search" searchbarEnable=".search-orders"></Link>
      </NavLeft>
        <NavTitle large>Clienti</NavTitle>
        <NavRight><Link href="#" iconF7="plus" onClick={openPopup}></Link></NavRight>
        <Searchbar 
      expandable
      className="search-orders"
      disableButtonText="Annulla"
      placeholder="Cerca"
      clearButton={true}
      toggle=""></Searchbar>
      </Navbar>
      
       {loading ? <Preloader /> : <CustomerList customers={customers}/>}

        <CustomerPopup 
        opened={popup}
        close={closePopup}
        onSubmit={handleSubmit} 
        isLoading={loading}
        data={form}
        onChange={handleOnChange}/>

    </Page>

  
  );
}

export default Customers;
