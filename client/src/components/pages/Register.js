import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Form, Container, Header, Button, Divider } from 'semantic-ui-react';

import useForm from '../../utils/hooks/useForm';
import REGISTER_USER from '../../mutations/registerUser';

export default function(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <Container
      style={{
        width: '450px',
        margin: '80px 0 100px',
        padding: '40px 30px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.12)'
      }}
    >
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Header
          style={{ margin: '20px 0' }}
          className='ui center aligned'
          as='h1'
        >
          Sign up
        </Header>
        <Form.Input
          label='Username'
          name='username'
          type='text'
          error={errors.username}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          name='email'
          type='email'
          error={errors.email}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          name='password'
          type='password'
          error={errors.password}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm password'
          name='confirmPassword'
          type='password'
          error={errors.confirmPassword}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button fluid primary type='submit'>
          Create Account
        </Button>
        <Divider style={{ marginTop: '20px' }} />
        Already have an account? <Link to='login'>Log in</Link>
      </Form>
    </Container>
  );
}
