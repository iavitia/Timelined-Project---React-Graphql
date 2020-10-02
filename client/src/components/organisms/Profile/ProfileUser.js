import React from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { IconSocial, ThemeDivider } from '../../atoms';

export default function ({ profilePic, name, username, contact, about }) {
  let checkName = name === null ? username : name;

  return (
    <Grid padded='vertically'>
      <Grid.Row>
        <Grid.Column computer={2} tablet={3} mobile={4}>
          <Image size='small' src={profilePic} />
        </Grid.Column>

        <Grid.Column computer={6} tablet={6} mobile={11}>
          <Header as='h1' style={{ marginBottom: '5px' }}>
            {checkName}
          </Header>

          {contact.twitter && (
            <IconSocial url={contact.twitter} name='twitter' />
          )}

          {contact.instagram && (
            <IconSocial url={contact.instagram} name='instagram' />
          )}

          {contact.facebook && (
            <IconSocial url={contact.facebook} name='facebook f' />
          )}

          {contact.email && <IconSocial url={contact.email} name='mail' />}

          <p style={{ marginTop: '10px' }}>{about}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
