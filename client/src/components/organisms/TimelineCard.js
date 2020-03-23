import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card } from 'semantic-ui-react';
import { LikeButton } from '../molecules';

import { AuthContext } from '../../context/auth';
import { useContext } from 'react';

function TimelineCard({
  timeline: { id, headline, summary, likes, likeCount, imgUrl }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid centered={true}>
      <Image src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header
          as={Link}
          to={`/timelines/${id}`}
          style={{ margin: '25px 0' }}
          className='ui center aligned'
        >
          {headline}
        </Card.Header>
        <LikeButton user={user} timeline={{ id, likes, likeCount }} />
      </Card.Content>
    </Card>
  );
}

export default TimelineCard;
