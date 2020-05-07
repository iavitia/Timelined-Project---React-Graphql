import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import FETCH_TIMELINES_QUERY from '../../mutations/fetchTimelines';

export default function ({ timelineId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteTimeline] = useMutation(DELETE_TIMELINE_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);

      // Removes deleted item from cache
      const data = proxy.readQuery({
        query: FETCH_TIMELINES_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_TIMELINES_QUERY,
        data: {
          getTimelines: data.getTimelines.filter((p) => p.id !== timelineId),
        },
      });
      if (callback) callback();
    },
    variables: {
      timelineId,
    },
  });
  return (
    <>
      <Button
        icon
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteTimeline}
        header='Delete Timeline'
        content='Are you sure you want to delete this timeline?'
        confirmButton='Delete'
        size='mini'
      />
    </>
  );
}

const DELETE_TIMELINE_MUTATION = gql`
  mutation deleteTimeline($timelineId: ID!) {
    deleteTimeline(timelineId: $timelineId)
  }
`;
