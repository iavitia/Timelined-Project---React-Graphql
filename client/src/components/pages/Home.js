import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Container } from 'semantic-ui-react';
import TimelineCard from '../organisms/TimelineCard';
import FETCH_TIMELINES_QUERY from '../../mutations/fetchTimelines';

export default function() {
  let timelines = '';
  const { loading, data } = useQuery(FETCH_TIMELINES_QUERY);

  if (data) timelines = { data: data.getTimelines };

  return (
    <Container>
      <Grid columns={3}>
        <Grid.Row>
          <h1>Recent Timelines</h1>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h1>Loading timelines...</h1>
          ) : (
            timelines.data &&
            timelines.data.map(timeline => (
              <Grid.Column key={timeline.id} style={{ marginBottom: '20px' }}>
                <TimelineCard timeline={timeline} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
}
