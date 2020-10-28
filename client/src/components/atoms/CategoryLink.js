import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  color: #bf0021;
  font-weight: 700;
  letter-spacing: 3px;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    opacity: 0.5;
    color: #bf0021;
  }
`;
