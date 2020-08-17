import gql from 'graphql-tag';

const FETCH_USER_QUERY = gql`
  query($username: String!) {
    getUser(username: $username) {
      id
      username
      name
      createdAt
      about
      profilePic
      contact {
        email
        twitter
        facebook
        instagram
      }
    }
  }
`;

export default FETCH_USER_QUERY;
