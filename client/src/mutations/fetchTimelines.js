import gql from 'graphql-tag';

const FETCH_TIMELINES_QUERY = gql`
  {
    getTimelines {
      id
      username
      createdAt
      headline
      summary
      imgUrl
      likes {
        username
      }
      likeCount
      sources {
        id
        username
        body
        url
        createdAt
      }
    }
  }
`;

export default FETCH_TIMELINES_QUERY;
