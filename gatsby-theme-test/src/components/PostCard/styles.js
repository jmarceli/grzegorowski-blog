import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import { ffSans, toEm } from "src/utils/typography";
import { BP_SMALL } from "../variables";

export const Article = styled.article`
  display: flex;
  flex: 1 0 100%;
  width: 100%;
`;

export const Link = styled(GatsbyLink)`
  display: flex;
  flex: 1 0 100%;
  width: 100%;

  flex-direction: column;
  @media (min-width: ${BP_SMALL}px) {
    flex-direction: ${({ size }) => (size === "large" ? "row" : "column")};
  }
`;

export const Thumbnail = styled.div`
  display: flex;
  flex: 0 0 250px;
  @media (min-width: ${BP_SMALL}px) {
    flex: ${({ large }) => (large ? "1 0 50%" : "0 0 250px")};
  }
  background: #262626;
  background-size: cover;
  background-position: center center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({ large }) => (large ? "0 1 344px" : "1 1 auto")};
  background: #fff;
  padding: 20px;
`;

export const Tag = styled.h3`
  display: block;
  font-size: ${toEm(12)}rem;
  margin-bottom: 6px;
  color: #666;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  display: block;
  font-size: ${toEm(20)}rem;
  line-height: 1.2;
  margin-bottom: 0.6em;
`;

export const Excerpt = styled.p`
  flex: 1 0 auto;
  display: block;
  font-size: 0.7619rem;
  line-height: 1.4;
  margin: 0 0 18px;
  font-size: ${toEm(14)}rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #666;
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
