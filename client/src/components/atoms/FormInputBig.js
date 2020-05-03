import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export default styled(Form.Input)`
  &&& {
    input {
      border-radius: 0;

      &:focus {
        border: 1px solid #303845;
        border-radius: 0;
      }
    }

    label {
      font-size: 12px;
    }
  }
`;
