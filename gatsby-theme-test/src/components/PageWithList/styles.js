import styled from "styled-components";
import { CONTENT_MAX_WIDTH, CONTENT_OVERLAP_HEIGHT } from "../variables";

export const Content = styled.div`
  display: block;
  margin: -${CONTENT_OVERLAP_HEIGHT}px auto 0;
  max-width: ${CONTENT_MAX_WIDTH}px;
  flex: 1 0 auto;
  min-width: 33.333%;
`;
