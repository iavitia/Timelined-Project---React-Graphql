import React, { useContext, useState } from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

export default function() {
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
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : (
    <>
      <Menu.Item
        name='login'
        as={Link}
        to='/login'
        active={activeItem === 'login'}
        onClick={handleItemClick}
      />

      <Menu.Item
        name='signup'
        as={Link}
        to='/register'
        active={activeItem === 'signup'}
        onClick={handleItemClick}
      />
    </>
  );

  return (
    <Menu style={{ border: '0' }} borderless={true} size='massive'>
      <Menu.Item
        as={Link}
        to='/'
        header
        active={activeItem === 'home'}
        onClick={handleItemClick}
      >
        <Image
          style={{ height: '35px' }}
          src='https://react.semantic-ui.com/logo.png'
        />
      </Menu.Item>

      <Menu.Menu position='right'>{navLinks}</Menu.Menu>
    </Menu>
  );
}
