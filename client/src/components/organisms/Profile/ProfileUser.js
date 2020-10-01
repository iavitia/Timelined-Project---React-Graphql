import React from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';

export default function ({ profilePic, name, username, contact }) {
  let checkName = name === null ? username : name;

  return (
    <Grid padded='vertically'>
      <Grid.Row>
        <Grid.Column computer={2} tablet={3} mobile={3}>
          <Image size='small' src={profilePic} />
        </Grid.Column>

        <Grid.Column computer={14} tablet={13} mobile={13}>
          <Header as='h1'>{checkName}</Header>
          {contact.facebook && (
            <Button
              basic
              icon='facebook'
              color='facebook'
              as='a'
              role='link'
              href='https://facebook.com'
              target='_blank'
            />
          )}
          {contact.twitter && (
            <Button
              basic
              icon='twitter'
              color='twitter'
              as='a'
              role='link'
              href='https://twitter.com'
              target='_blank'
            />
          )}
          {contact.instagram && (
            <Button
              basic
              icon='instagram'
              color='instagram'
              as='a'
              role='link'
              href='https://instagram.com'
              target='_blank'
            />
          )}
          {contact.email && (
            <Button
              basic
              icon='mail'
              as='a'
              role='link'
              href='https://mail.com'
              target='_blank'
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
