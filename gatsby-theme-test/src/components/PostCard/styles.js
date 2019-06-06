import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import { ffSans, toEm } from "src/utils/typography";

export const Article = styled.article`
  display: flex;
  flex: 1 0 100%;
`;

export const Link = styled(GatsbyLink)`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
`;

export const Thumbnail = styled.div`
  display: block;
  height: 250px;
  background: #000;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  background: #fff;
  padding: 20px;
`;

export const Tag = styled.h3`
  display: block;
  font-size: ${toEm(12)}rem;
  margin-bottom: 6px;
  color: #666;
`;

export const Title = styled.h2`
  display: block;
  font-size: ${toEm(16)}rem;
  line-height: 1.2;
  margin-bottom: 0.6em;
`;

export const Excerpt = styled.p`
  flex: 1 0 auto;
  display: block;
  font-size: 0.7619rem;
  line-height: 1.4;
  margin: 0;
  font-size: ${toEm(14)}rem;
`;

export const TimeToRead = styled.div`
  align-self: flex-end;
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #666;
  margin-top: 6px;
`;
