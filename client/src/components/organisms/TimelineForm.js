import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import useForm from '../../utils/hooks/useForm';

import { Button, Form, Header } from 'semantic-ui-react';

export default function() {
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(createTimelineCallback, {
    headline: '',
    summary: '',
    imgUrl: ''
  });

  const [createTimeline, { loading }] = useMutation(CREATE_TIMELINE_MUTATION, {
    variables: values,
    update(_, result) {
      // console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  function createTimelineCallback() {
    createTimeline();
  }

  return (
    <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
      <Header as='h2'>Timeline</Header>
      <Form.Input
        placeholder='Title'
        name='headline'
        type='text'
        onChange={onChange}
        value={values.headline}
        error={errors.headline}
      />
      <Form.Input
        placeholder='Summary'
        name='summary'
        type='text'
        onChange={onChange}
        value={values.summary}
        error={errors.summary}
      />
      <Form.Input
        placeholder='Image URL'
        name='imgUrl'
        type='text'
        onChange={onChange}
        value={values.imgUrl}
        error={errors.imgUrl}
      />
      <Button type='submit' color='teal'>
        Submit
      </Button>
    </Form>
  );
}

const CREATE_TIMELINE_MUTATION = gql`
  mutation createTimeline(
    $headline: String!
    $summary: String!
    $imgUrl: String!
  ) {
    createTimeline(headline: $headline, summary: $summary, imgUrl: $imgUrl) {
      id
      headline
      summary
      imgUrl
      createdAt
      username
    }
  }
`;
