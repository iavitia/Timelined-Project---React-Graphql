import React from 'react';
import { Grid, Item } from 'semantic-ui-react';

export default function ({ source }) {
  return (
    <Grid.Row>
      <Grid.Column computer={12} mobile={16}>
        <Item>
          <Item.Content>
            <Item.Meta>June 15, 1992</Item.Meta>
            <Item.Description>{source.body}</Item.Description>
            <Item.Extra>
              <a href={source.url} target='_blank' rel='noopener noreferrer'>
                Read more
              </a>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Grid.Column>
    </Grid.Row>
  );
}
