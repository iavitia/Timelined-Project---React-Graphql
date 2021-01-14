import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Container, Divider } from 'semantic-ui-react';
import { ProfileUser, ProfileUserTimelines } from '../organisms';
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
    return <Container>error</Container>;
  }

  let userMarkup;

  if (!data.getUser) {
    userMarkup = <p>Loading user...</p>;
  } else {
    const {
      username,
      about,
      profilePic,
      name,
      timelines,
      contact,
    } = data.getUser;

    userMarkup = (
      <Container>
        <ProfileUser
          profilePic={profilePic}
          name={name}
          username={username}
          contact={contact}
          about={about}
        />

        <Divider />

        <ProfileUserTimelines timelines={timelines} />
      </Container>
    );
  }

  return userMarkup;
}
