import styled from "styled-components";
import { BP_SMALL, CONTENT_MAX_WIDTH } from "../variables";

export const Wrapper = styled.aside`
  background: #f4f8fb;
`;

export const Container = styled.div`
  display: block;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 12px 0;
  @media (min-width: ${BP_SMALL}px) {
    padding: 12px;
  }
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

// fix left-right margin collapsing
export const Item = styled.li`
  display: flex;
  flex: 1 1 300px;
  max-width: 600px;
  margin: 12px 8px;
  @media (min-width: ${BP_SMALL}px) {
    margin: 12px;
  }
`;
