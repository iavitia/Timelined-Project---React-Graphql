import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { DeleteButton, LikeButton } from '../molecules';

import { AuthContext } from '../../context/auth';

export default function ({
  timeline: { id, username, headline, summary, likes, likeCount, imgUrl },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid centered={true}>
      <Image src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header
          as={Link}
          to={`/timelines/${id}`}
          className='ui center aligned mb-5 mt-5'
        >
          {headline}
        </Card.Header>
        <LikeButton user={user} timeline={{ id, likes, likeCount }} />
        {user && user.username === username && <DeleteButton timelineId={id} />}
      </Card.Content>
    </Card>
  );
}
