import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks';

const Nav = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar variant="light" expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">{t('brand')}</Navbar.Brand>
        { loggedIn && (<Button onClick={logOut}>{t('logout')}</Button>)}
      </Container>
    </Navbar>
  );
};

export default Nav;
