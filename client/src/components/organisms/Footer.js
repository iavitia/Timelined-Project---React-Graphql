import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Image, List, Segment } from 'semantic-ui-react';

export default function() {
  return (
    <Segment
      inverted
      vertical
      style={{
        margin: '5em 0em 0em',
        padding: '2em 0em'
      }}
    >
      <Container textAlign='center'>
        <Image
          centered
          size='mini'
          src='https://react.semantic-ui.com/logo.png'
        />
        <List horizontal inverted divided link size='small'>
          <List.Item as={Link} to='/'>
            Home
          </List.Item>
          <List.Item as={Link} to='/contact'>
            Contact Us
          </List.Item>
          <List.Item as={Link} to='terms'>
            Terms and Conditions
          </List.Item>
          <List.Item as={Link} to='/privacy'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
}
