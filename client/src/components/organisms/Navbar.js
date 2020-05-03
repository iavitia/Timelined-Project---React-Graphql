import React, { useContext, useState } from 'react';
import { Image, Input, Icon } from 'semantic-ui-react';
import { Nav, Dropdown } from '../atoms';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

export default function () {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? '' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const navLinks = user ? (
    <>
      <Dropdown item icon='user'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/profile'>
            Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to='/newtimeline'>
            New Timeline
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : (
    <>
      <Dropdown item text='Sign Up'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/login'>
            Log In
          </Dropdown.Item>
          <Dropdown.Item as={Link} to='/register'>
            Create Account
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  return (
    <Nav borderless={true} fixed='top' size='small'>
      <Dropdown item icon='sidebar' simple></Dropdown>

      <Nav.Item
        as={Link}
        to='/'
        header
        active={activeItem === 'home'}
        onClick={handleItemClick}
      >
        <Image size='mini' src='/t3.svg' />
      </Nav.Item>

      <Nav.Menu position='right'>{navLinks}</Nav.Menu>
    </Nav>
  );
}
