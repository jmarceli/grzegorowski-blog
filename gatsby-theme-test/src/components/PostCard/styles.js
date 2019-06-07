import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import { ffSans, toEm } from "src/utils/typography";

export const Article = styled.article`
  display: flex;
  flex: 1 0 100%;
`;

export const Link = styled(GatsbyLink)`
  display: flex;
  flex-direction: ${({ large }) => (large ? "row" : "column")};
  flex: 1 0 100%;
`;

export const Thumbnail = styled.div`
  display: flex;
  flex: ${({ large }) => (large ? "1 0 auto" : "0 0 250px")};
  background: #262626;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({ large }) => (large ? "0 0 344px" : "1 0 auto")};
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

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #666;
  margin-top: 6px;
`;

export const Author = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

export const TimeToRead = styled.div`
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #666;
`;
