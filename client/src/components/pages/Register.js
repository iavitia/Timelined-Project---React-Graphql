import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Form, Header, Grid } from 'semantic-ui-react';
import {
  Container,
  FormButtonPrimary,
  FormInputBig,
  SubText,
  SubLink,
} from '../atoms';

import useForm from '../../utils/hooks/useForm';
import REGISTER_USER from '../../mutations/registerUser';
import { AuthContext } from '../../context/auth';

export default function (props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
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
              Create an Account
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
              label='Email'
              name='email'
              type='email'
              size='big'
              error={errors.email}
              value={values.email}
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
            <FormInputBig
              label='Confirm password'
              name='confirmPassword'
              type='password'
              size='big'
              error={errors.confirmPassword}
              value={values.confirmPassword}
              onChange={onChange}
            />
            <SubText style={{ marginTop: '20px' }}>
              By creating an account you agree to our{' '}
              <SubLink to='terms'>Terms and Conditions</SubLink>,{' '}
              <SubLink to='privacy'>Privacy Policy</SubLink>, and account
              related communications.
            </SubText>
            <FormButtonPrimary fluid type='submit'>
              SIGN UP
            </FormButtonPrimary>

            <p>
              Already have an account? <Link to='login'>Log in</Link>
            </p>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
