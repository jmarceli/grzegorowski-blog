import styled from "styled-components";
import { CONTENT_MAX_WIDTH, CONTENT_OVERLAP_HEIGHT } from "../variables";

export const Header = styled.div`
  padding: 0 12px;
  margin: 0 0 -12px;
`;

export const Content = styled.div`
  display: block;
  margin: -${CONTENT_OVERLAP_HEIGHT}px auto 0;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;
