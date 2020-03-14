import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  Form,
  Container,
  Header,
  Button,
  Divider,
  Grid,
  Card,
  Icon
} from 'semantic-ui-react';

import useForm from '../../utils/hooks/useForm';
import LOGIN_USER from '../../mutations/loginUser';
import { AuthContext } from '../../context/auth';

export default function(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
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
    <Grid centered columns={2}>
      <Grid.Column>
        <Card
          style={{
            width: '450px',
            margin: '80px 0 120px',
            padding: '40px 30px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)'
          }}
        >
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? 'loading' : ''}
          >
            <Header
              style={{ margin: '20px 0' }}
              className='ui center aligned'
              as='h1'
            >
              Welcome Back
            </Header>
            <Form.Input
              placeholder='Username'
              name='username'
              type='text'
              error={errors.username}
              value={values.username}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Password'
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
        </Card>
      </Grid.Column>
    </Grid>
  );
}
