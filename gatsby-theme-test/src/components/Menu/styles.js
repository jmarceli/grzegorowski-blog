import styled from "styled-components";
import { Link } from "gatsby";
import {
  BP_SMALL,
  BP_MEDIUM,
  BP_LARGE,
  CONTENT_MAX_WIDTH,
  ARTICLE_OFFSET_TOP,
  CONTENT_OVERLAP_HEIGHT,
} from "../variables";

export const Wrapper = styled.header`
  text-transform: uppercase;
`;

export const Container = styled.ul`
  display: inline-block;
  margin: 0;
  pading: 0;
  list-style: none;
`;

export const Item = styled(Link)`
  display: inline-block;
  padding: 12px;
  margin-right: -12px;
`;
