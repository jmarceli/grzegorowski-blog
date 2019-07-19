import styled from "styled-components";
import { Link } from "gatsby";
import { ffSans, toEm } from "src/utils/typography";
import {
  CONTENT_MAX_WIDTH,
  CONTENT_OVERLAP_HEIGHT,
  COLOR_PRIMARY,
} from "../variables";

export const Header = styled.div`
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

export const LinkHomepage = styled(Link)`
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  color: ${COLOR_PRIMARY};
  margin-top: 24px;
  display: inline-block;
`;
