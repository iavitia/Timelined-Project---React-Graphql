import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

export default styled(Menu)`
  &&& {
    box-shadow: none;
    border-bottom: 1px solid #e5e5e5;

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
