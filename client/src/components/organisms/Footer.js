import React from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

export default function () {
  return (
    <Segment basic className='mt-0 py-6'>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <List horizontal link size='small' verticalAlign='top'>
              <List.Item>
                <Image as={Link} to='/' size='mini' src='/t3.svg' />
              </List.Item>
              <List.Item>© 2020 Timlined</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <List horizontal link floated='right' size='small'>
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
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
