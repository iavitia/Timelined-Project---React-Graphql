import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card } from 'semantic-ui-react';

function TimelineCard({
  timeline: { id, headline, summary, likes, likeCount, imgUrl }
}) {
  return (
    <Card fluid centered={true} as={Link} to={`/timelines/${id}`}>
      <Image src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header style={{ margin: '25px 0' }} className='ui center aligned'>
          {headline}
        </Card.Header>
      </Card.Content>
    </Card>
  );
}

export default TimelineCard;
