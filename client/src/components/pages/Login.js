import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Form, Container, Header, Button, Divider } from 'semantic-ui-react';

import useForm from '../../utils/hooks/useForm';
import LOGIN_USER from '../../mutations/loginUser';

export default function(props) {
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Container
      style={{
        width: '450px',
        margin: '80px 0 120px',
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
          Welcome Back
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
          label='Password'
          name='password'
          type='password'
          error={errors.password}
          value={values.password}
          onChange={onChange}
        />
        <Button fluid primary type='submit'>
          Log in
        </Button>
        <Divider style={{ marginTop: '20px' }} />
        Don't have an account? <Link to='register'>Sign up</Link>
      </Form>
    </Container>
  );
}
