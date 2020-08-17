import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Button, Divider, Grid, Header, Item, Image } from 'semantic-ui-react';
import { Container } from '../atoms';
import { Loading } from '../molecules';

import { AuthContext } from '../../context/auth';
import FETCH_USER_QUERY from '../../mutations/getUser';

export default function (props) {
  const usernameParam = props.match.params.username;
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: usernameParam,
    },
  });

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Container navpadding='true'>error</Container>;
  }

  let userMarkup;

  if (!data.getUser) {
    userMarkup = <p>Loading user...</p>;
  } else {
    const { username, about, profilePic, name } = data.getUser;
    const contact = data.getUser.contact;
    let checkName = name === null ? username : name;

    userMarkup = (
      <Container navpadding='true'>
        <Grid centered padded='vertically'>
          <Grid.Row>
            <Grid.Column computer={16} mobile={16}>
              <Item.Group>
                <Item style={{ margin: '0px' }}>
                  <Image
                    style={{
                      width: '250px',
                      height: '250px',
                      objectFit: 'cover',
                    }}
                    rounded
                    src={profilePic}
                  />

                  <Item.Content>
                    <Item.Header>{checkName}</Item.Header>

                    <Item.Description>{about}</Item.Description>
                    <Item.Extra>
                      {contact.facebook && (
                        <Button
                          basic
                          icon='facebook'
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
                          as='a'
                          role='link'
                          href='https://instagram.com'
                          target='_blank'
                        />
                      )}
                      {contact.mail && (
                        <Button
                          basic
                          icon='mail'
                          as='a'
                          role='link'
                          href='https://mail.com'
                          target='_blank'
                        />
                      )}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>Timelines</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>Timelines...</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
  return userMarkup;
}
