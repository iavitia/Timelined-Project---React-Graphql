import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Icon, Label } from 'semantic-ui-react';

export default function({ user, timeline: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeTimeline] = useMutation(LIKE_TIMELINE_MUTATION, {
    variables: { timelineId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button icon onClick={likeTimeline} color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button icon onClick={likeTimeline} color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button icon as={Link} to='/login' color='teal' basic>
      <Icon name='heart' />
    </Button>
  );
  return (
    <Button as='div' labelPosition='right'>
      {likeButton}
      <Label basic color='teal' point='left'>
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_TIMELINE_MUTATION = gql`
  mutation likeTimeline($timelineId: ID!) {
    likeTimeline(timelineId: $timelineId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
