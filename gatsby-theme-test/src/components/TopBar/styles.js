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

export const Placeholder = styled.div`
  height: ${TOP_OFFSET}px;
`;

export const Wrapper = styled.header`
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: #000;
  color: #fff;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 50px;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;

export const Name = styled(Link)`
  padding: 12px;
  margin: 0 0 0 -12px;
`;
