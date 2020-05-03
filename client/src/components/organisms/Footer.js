import React from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Image,
  List,
  Responsive,
  Segment,
} from 'semantic-ui-react';

// Responsive footer doesn't appear on mobile devices
export default function () {
  return (
    <Segment basic>
      <Responsive minWidth={768}>
        <Container fluid>
          <Grid>
            <Grid.Column floated='left' width={2}>
              <Image size='mini' src='/t3.svg' />
            </Grid.Column>
          </Grid>

          <Grid.Column>
            <Divider />
          </Grid.Column>

          <Grid>
            <Grid.Column floated='left' width={5} only='computer tablet'>
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
                  Contact
                </List.Item>
                <List.Item as={Link} to='/terms'>
                  Terms & Conditions
                </List.Item>
                <List.Item as={Link} to='/privacy'>
                  Privacy Policy
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Container>
      </Responsive>
    </Segment>
  );
}
