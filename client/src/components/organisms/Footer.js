import React from 'react';

import { Link } from 'react-router-dom';
import { Image, List, Segment, Divider, Grid } from 'semantic-ui-react';

export default function () {
  return (
    <Segment
      vertical
      style={{
        margin: '5em 3em 0em',
        padding: '2em 0em',
      }}
    >
      <Grid centered>
        <Grid.Column floated='left' width={2}>
          <Image size='mini' src='/t3.svg' />
        </Grid.Column>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Column floated='left' width={5}>
          <List horizontal link size='small'>
            <List.Item>© 2020 Timlined</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column floated='right' width={11} textAlign='right'>
          <List horizontal divided link size='small'>
            <List.Item as={Link} to='/'>
              Home
            </List.Item>
            <List.Item as={Link} to='/contact'>
              Contact Us
            </List.Item>
            <List.Item as={Link} to='/terms'>
              Terms and Conditions
            </List.Item>
            <List.Item as={Link} to='/privacy'>
              Privacy Policy
            </List.Item>
          </List>
        </Grid.Column>
        {/* Social Media Links */}
        {/* <Grid.Column floated='right' width={5} textAlign='right'>
          <List horizontal link size='small'>
            <List.Item as={Link} to='/'>
              <List.Icon name='twitter' />
            </List.Item>
            <List.Item as={Link} to='/'>
              <List.Icon name='instagram' />
            </List.Item>
            <List.Item as={Link} to='/'>
              <List.Icon name='facebook' />
            </List.Item>
          </List>
        </Grid.Column> */}
      </Grid>
    </Segment>
  );
}
