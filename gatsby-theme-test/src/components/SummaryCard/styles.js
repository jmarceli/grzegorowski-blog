import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import { ffSans, toEm } from "src/utils/typography";

export const Content = styled.div`
  display: flex;
  flex: 1 0 100%;
  flex-direction: column;
  padding: 36px 24px 24px;
  text-align: center;
  background: #000;
  color: #fff;
  font-family: ${ffSans};
`;

export const TopLine = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SiteName = styled.h5`
  margin: 0 auto;
  font-weight: 300;
  font-size: ${toEm(12)}rem;
`;

export const LinkTop = styled(GatsbyLink)`
  display: block;
  margin: 0 auto;
  padding: 10px 12px;
  font-weight: 300;
`;

export const Title = styled.h2`
  font-weight: 300;
  font-size: ${toEm(22)}rem;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 24px auto 0;
  list-style: none;
`;

export const Item = styled.li`
  margin: 0;

  &:last-child a {
    border-bottom: none;
  }
`;

export const Link = styled(GatsbyLink)`
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: ${toEm(14)}rem;
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
  }
`;
