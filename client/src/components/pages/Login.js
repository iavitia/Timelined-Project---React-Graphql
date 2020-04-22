import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Form, Header, Button, Divider, Grid, Card } from 'semantic-ui-react';
import { Container, FormButtonPrimary, FormInputBig } from '../atoms';

import useForm from '../../utils/hooks/useForm';
import LOGIN_USER from '../../mutations/loginUser';
import { AuthContext } from '../../context/auth';

export default function (props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Container navpadding='true'>
      <Grid centered style={{ paddingTop: '1em' }}>
        <Grid.Column computer={6} mobile={16}>
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
            <FormInputBig
              label='Username'
              name='username'
              type='text'
              size='big'
              error={errors.username}
              value={values.username}
              onChange={onChange}
            />
            <FormInputBig
              label='Password'
              name='password'
              type='password'
              size='big'
              error={errors.password}
              value={values.password}
              onChange={onChange}
            />
            <FormButtonPrimary fluid type='submit'>
              LOG IN
            </FormButtonPrimary>
            <p>
              Don't have an account? <Link to='register'>Sign up</Link>
            </p>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
