import styled from "styled-components";
import { CONTENT_MAX_WIDTH } from "../variables";

export const Header = styled.div`
  padding: 0 12px;
  margin: 0 0 -12px;
`;

export const Content = styled.div`
  display: block;
  margin: -150px auto 0;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;
