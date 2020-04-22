import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export default styled(Form.Input)`
  &&& {
    input {
      border-radius: 0;

      &:focus {
        border-radius: 0;
        border: 1px solid #303845;
      }
    }

    label {
      font-size: 12px;
    }
  }
`;
