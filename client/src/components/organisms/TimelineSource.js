import React from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';

export default function ({ source }) {
  return (
    <Grid.Row>
      <Grid.Column computer={11} tablet={14} mobile={16}>
        <Container fluid text>
          <Header as='h4'>June 15, 1992</Header>
          <p>{source.body}</p>
          <Button
            basic
            color='teal'
            href={source.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Read more
            <Icon name='angle right' />
          </Button>
        </Container>
      </Grid.Column>
    </Grid.Row>
  );
}
