import styled from "styled-components";
import { BP_SMALL, BP_MEDIUM, CONTENT_MAX_WIDTH } from "../variables";

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

const smallSizes = {
  small: "50%",
  medium: "50%",
  large: "100%",
};
const mediumSizes = {
  small: "33.333%",
  medium: "50%",
  large: "100%",
};

// fix left-right margin collapsing
export const Item = styled.li`
  display: flex;
  flex: 1 0 100%;
  @media (min-width: ${BP_SMALL}px) {
    flex: 1 0 ${({ size }) => smallSizes[size]};
  }
  @media (min-width: ${BP_MEDIUM}px) {
    flex: 1 0 ${({ size }) => mediumSizes[size]};
  }

  width: 100%;
  @media (min-width: ${BP_SMALL}px) {
    width: ${({ size }) => smallSizes[size]};
  }
  @media (min-width: ${BP_MEDIUM}px) {
    width: ${({ size }) => mediumSizes[size]};
  }

  margin: 0;
  @media (min-width: ${BP_SMALL}px) {
    min-height: ${({ size }) => (size === "large" ? "400" : "460")}px;
  }

  padding: 12px 8px;
  @media (min-width: ${BP_SMALL}px) {
    padding: 12px;
  }
  &:first-child {
    padding: 6px;
  }
`;
