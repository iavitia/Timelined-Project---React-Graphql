import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

export default function() {
  return (
    <Segment>
      <Dimmer page active inverted>
        <Loader size='large' content='Loading...' />
      </Dimmer>
    </Segment>
  );
}
