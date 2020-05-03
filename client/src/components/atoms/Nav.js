import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

export default styled(Menu)`
  &&& {
    border-bottom: 1px solid #e5e5e5;
    box-shadow: none;

    a {
      background-color: #fff;

      &:hover {
        background-color: #fff;
      }

      &:active {
        background-color: #fff;
      }
    }
  }
`;
