import styled from "styled-components";
import { ffSans, toEm } from "src/utils/typography";
import { Link as GatsbyLink } from "gatsby";

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
  overflow-y: hidden;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const List = styled.ul`
  height: 100%;
  display: flex;
  margin: 0;
  pading: 0;
  list-style: none;
  white-space: nowrap;
`;

export const Item = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;

  &:last-child {
    padding-right: 12px;
  }

  &:hover {
    color: #fff;
  }
`;

export const Link = styled(GatsbyLink)`
  display: flex;
  padding: 12px;
`;

export const ExternalLink = styled.a`
  display: flex;
  padding: 12px;
`;
