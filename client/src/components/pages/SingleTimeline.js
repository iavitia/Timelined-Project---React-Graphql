import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Button, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { Container, SubText } from '../atoms';
import { DeleteButton, LikeButton, Loading } from '../molecules';
import { TimelineSource } from '../organisms';

import { AuthContext } from '../../context/auth';

export default function (props) {
  const timelineId = props.match.params.timelineId;
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(FETCH_TIMELINE_QUERY, {
    variables: {
      timelineId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;

  function deleteTimelineCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if (!data.getTimeline) {
    postMarkup = <p>Loading timeline...</p>;
  } else {
    const {
      id,
      headline,
      imgUrl,
      summary,
      createdAt,
      username,
      sources,
      likes,
      likeCount,
    } = data.getTimeline;

    postMarkup = (
      <Container navpadding='true'>
        <Grid textAlign='left' centered padded='vertically'>
          <Grid.Row style={{ padding: '28px 0 0' }}>
            <Grid.Column computer={12} mobile={16}>
              <SubText>Updated {moment(createdAt).fromNow()}</SubText>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <Header as='h1'>
                {headline}
                <Header.Subheader>{summary}</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column computer={6} mobile={8}>
              <div>
                By:{' '}
                <Link style={{ color: '#000' }} to={`/profile/${username}`}>
                  {username}
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column computer={6} mobile={8} textAlign='right'>
              <Button icon>
                <Icon name='bookmark outline' />
              </Button>
              <LikeButton user={user} timeline={{ id, likes, likeCount }} />
              {user && user.username === username && (
                <DeleteButton
                  timelineId={id}
                  callback={deleteTimelineCallback}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <Image src={imgUrl} float='right' fluid />
            </Grid.Column>
            <Grid.Column computer={12} mobile='16'>
              <SubText>Source:</SubText>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid centered>
          {sources.map((source) => (
            <TimelineSource source={source} key={source.id} />
          ))}
        </Grid>
      </Container>
    );
  }
  return postMarkup;
}

const FETCH_TIMELINE_QUERY = gql`
  query($timelineId: ID!) {
    getTimeline(timelineId: $timelineId) {
      id
      headline
      summary
      imgUrl
      createdAt
      username
      sources {
        id
        body
        url
      }
      likeCount
      likes {
        username
      }
    }
  }
`;
