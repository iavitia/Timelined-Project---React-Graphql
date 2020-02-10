import React, { useState } from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function() {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? '' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

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

      <Menu.Menu position='right'>
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
      </Menu.Menu>
    </Menu>
  );
}
