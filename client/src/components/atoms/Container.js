import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

export default styled(Container)`
  padding-top: ${(props) => (props.navpadding ? '60.14px' : '0')};
`;
