import styled from "styled-components";
import { Link } from "gatsby";
import {
  BP_SMALL,
  BP_MEDIUM,
  BP_LARGE,
  CONTENT_MAX_WIDTH,
  ARTICLE_OFFSET_TOP,
  CONTENT_OVERLAP_HEIGHT,
  TOP_OFFSET,
} from "../variables";

export const Wrapper = styled.header`
  background: #000;
  color: #fff;
`;

export const Container = styled.div`
  padding: 12px 24px;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;

export const Name = styled(Link)`
  padding: 12px;
  margin: -12px 0 -12px -12px;
`;
