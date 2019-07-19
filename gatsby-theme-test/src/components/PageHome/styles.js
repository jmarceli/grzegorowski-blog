import styled from "styled-components";
import { CONTENT_MAX_WIDTH, CONTENT_OVERLAP_HEIGHT } from "../variables";

export const MenuWrapper = styled.div`
  padding: 0 12px;
  margin: 0 0 -12px;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: block;
  margin: -${CONTENT_OVERLAP_HEIGHT}px auto 0;
  max-width: ${CONTENT_MAX_WIDTH}px;
  flex: 1 0 auto;
`;
