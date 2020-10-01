import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Image } from 'semantic-ui-react';
import { CategoryLink } from '../../atoms';

export default function ({ timelines }) {
  return (
    <Grid
      padded='vertically'
      divided='vertically'
      stackable
      style={{ maxWidth: '800px' }}
    >
      {timelines.map((timeline) => (
        <Grid.Row computer={10} tablet={16} mobile={16} key={timeline.id}>
          <Grid.Column computer={6} tablet={6} mobile={7}>
            <Image
              className='opacity'
              as={Link}
              to={`/timelines/${timeline.id}`}
              src={timeline.imgUrl}
            />
          </Grid.Column>
          <Grid.Column computer={7} tablet={7} mobile={7}>
            {/* Create route to categories  */}
            <CategoryLink to={`/timelines/${timeline.id}`}>NEWS</CategoryLink>

            <Link to={`/timelines/${timeline.id}`}>
              <Header className='opacity' style={{ marginTop: '5px' }} as='h1'>
                {timeline.headline}
              </Header>
            </Link>
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
}
