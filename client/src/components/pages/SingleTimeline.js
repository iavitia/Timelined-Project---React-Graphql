import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Divider,
  List,
} from 'semantic-ui-react';
import { CategoryLink } from '../atoms';
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
      <Container>
        <Grid textAlign='left' padded='vertically'>
          <Grid.Row className='pt-8'>
            <Grid.Column computer={12} mobile={16}>
              <CategoryLink to='/'>Technology</CategoryLink>

              <Header as='h1' className='mt-4'>
                {headline}
                <Header.Subheader className='mt-2'>{summary}</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='pt-4 pb-0'>
            <Grid.Column computer={12} mobile={16}>
              <Image src={imgUrl} float='right' fluid />
            </Grid.Column>
            <Grid.Column computer={12} mobile='16' className='pt-3'>
              <p>Source:</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='py-0'>
            <Grid.Column computer={12} mobile={16}>
              <Divider />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <List>
                <List.Item>
                  <List.Content floated='right'>
                    <LikeButton
                      user={user}
                      timeline={{ id, likes, likeCount }}
                    />
                    <Icon name='bookmark outline' size='large' />
                    {user && user.username === username && (
                      <DeleteButton
                        timelineId={id}
                        callback={deleteTimelineCallback}
                      />
                    )}
                  </List.Content>

                  <List.Content>
                    <List.Header>
                      By <Link to={`/profile/${username}`}>{username}</Link>
                    </List.Header>
                    {moment(createdAt).format('MM / DD / YYYY')}
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
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
