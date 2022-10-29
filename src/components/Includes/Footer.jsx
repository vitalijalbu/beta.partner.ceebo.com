import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Link,
  Icon,
  Badge,
  useStore,
  f7
} from "framework7-react";
import Menu from './Menu';
import { Home, Bike, ShoppingBag } from '../../utilities/Icons/';

const Footer = () => {
  const sessionSummary = useStore('summary');
  const url = f7.view.main.router.currentRoute.name;
  
  const [panel, setPanel] = useState(false);


  const openPanel = () => {
    setPanel(true);
  }
  const closePanel = () => {
    setPanel(false);
  }


  //console.log('footer-sumamry', sessionSummary);

  return (
    <>
    <Menu opened={panel} close={closePanel}/>
    <Toolbar labels bottom id="menu-footer"> 
        <Link key="home" reloadAll={true} href="/home" className="tab-link" ignoreCache tabLinkActive={url === 'home'}> 
            <Icon>
              <Home/>
              {sessionSummary.total_count > 0 ? (<Badge color="blue">{sessionSummary.total_count}</Badge>) : null}
            </Icon>
          <span className="tabbar-label">Home</span>
        </Link>
        <Link key="pickup" reloadAll={true} href="/pickup" ignoreCache className="tab-link" tabLinkActive={url === 'pickup'}>
            <Icon>
              <ShoppingBag/>
              {sessionSummary.total_pickup > 0 ? (<Badge color="blue">{sessionSummary.total_pickup}</Badge>) : null}
            </Icon>
          <span className="tabbar-label">Asporto</span>
        </Link>
         <Link key="checkout" reloadAll={true} href="/checkout" ignoreCache className="tab-link" tabLinkActive={url === 'checkout'}>
            <Icon f7="plus">
              {sessionSummary.total_checkout > 0 ? (<Badge color="blue">{sessionSummary.total_checkout}</Badge>) : null}
            </Icon>
          <span className="tabbar-label">Checkout</span>
        </Link>
        <Link key="delivery" reloadAll={true} href="/delivery" ignoreCache className="tab-link" tabLinkActive={url === 'delivery'}>
            <Icon>
            <Bike/>
              {sessionSummary.total_delivery > 0 ? (<Badge color="blue">{sessionSummary.total_delivery}</Badge>) : null}
          </Icon>
          <span className="tabbar-label">Delivery</span>
        </Link>
          <Link
            key="bars"
            text="Menu"
            iconF7="bars"
            onClick={(e) => openPanel()}
            className="tab-link"
          ></Link>
    </Toolbar>
    </>
  );
}

export default Footer;
