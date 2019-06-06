import styled from "styled-components";
import { Link } from "gatsby";
import { ffSans, toEm } from "src/utils/typography";
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
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;

export const Name = styled(Link)`
  height: 100%;
  padding: 0 24px;
  max-width: 50vw;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
`;

export const InnerName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
