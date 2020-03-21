import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import Img from "gatsby-image";
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
  border: none;

  flex-direction: column;
  @media (min-width: ${BP_SMALL}px) {
    flex-direction: ${({ size }) => (size === "large" ? "row" : "column")};
  }
`;

export const ThumbnailMobile = styled.div`
  position: relative;
  padding-bottom: ${({ large }) => (large ? 0 : "50%")};
  display: flex;
  flex: 0 0 250px;
  @media (min-width: ${BP_SMALL}px) {
    flex: ${({ large }) => (large ? "1 0 50%" : "0 0 250px")};
  }
`;

export const Thumbnail = styled(Img)`
  display: flex;
  flex: 0 0 250px;
  @media (min-width: ${BP_SMALL}px) {
    flex: ${({ large }) => (large ? "1 0 50%" : "0 0 250px")};
  }
`;

export const NoThumbnail = styled.div`
  display: flex;
  flex: 0 0 250px;
  @media (min-width: ${BP_SMALL}px) {
    flex: ${({ large }) => (large ? "1 0 50%" : "0 0 250px")};
  }
  background: #262626;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  z-index: 1;
  @media (min-width: ${BP_SMALL}px) {
    flex: ${({ large }) => (large ? "0 1 344px" : "1 1 auto")};
  }
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
  align-items: center;
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #666;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Date = styled.span`
  vertical-align: middle;
`;

export const Author = styled.span`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #eee;
  margin-right: 6px;
`;

export const Avatar = styled(Img)`
  max-width: 100%;
  max-height: 100%;
`;

export const TimeToRead = styled.div`
  font-family: ${ffSans};
  font-size: ${toEm(12)}rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #666;
`;
