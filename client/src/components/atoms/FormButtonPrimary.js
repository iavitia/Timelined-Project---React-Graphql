import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export default styled(Form.Button)`
  &&& {
    button {
      background-color: #222831;
      border-radius: 0;
      color: #fff;
      font-size: 13px;
      letter-spacing: 0.143em;
      padding: 17.46px;

      &:active {
        background-color: #222831;
      }

      &:hover {
        background-color: #303845;
      }
    }
  }
`;
