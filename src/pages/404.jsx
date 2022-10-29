import React from 'react';
import { Page, Navbar, Block, f7 } from 'framework7-react';

  const NotFoundPage = (props) => {
    const { f7route, f7router } = props;
    //console.log('path', f7route.path);
    return (
    <Page>
      <Navbar title="Not found" backLink="Back" />
      <Block strong>
        <p>Sorry</p>
        <p>Requested content not found.</p>
      </Block>
    </Page>
    );
};

export default NotFoundPage;
