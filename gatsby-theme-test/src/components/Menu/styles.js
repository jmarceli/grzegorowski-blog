import styled from "styled-components";
import { ffSans, toEm } from "src/utils/typography";
import { Link } from "gatsby";

export const Wrapper = styled.nav`
  text-transform: uppercase;
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  color: #fff;
  flex: 1 0 auto;
  height: 50px;
  overflow: hidden;

  &:hover {
    color: #ccc;
  }
`;

export const Scroller = styled.div`
  box-sizing: content-box;
  height: 100%;
  padding-bottom: 40px;
  overflow: scroll;
`;

export const Container = styled.ul`
  height: 100%;
  display: flex;
  margin: 0;
  pading: 0;
  list-style: none;
  white-space: nowrap;
`;

export const Item = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;

  &:last-child {
    padding-right: 24px;
  }

  &:hover {
    color: #fff;
  }
`;
