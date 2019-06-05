import styled from "styled-components";
import typography from "../../utils/typography";
import { Link as GatsbyLink } from "gatsby";
import { toEm } from "src/utils/typography";

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
  height: 200px;
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
  margin-bottom: 0.8em;
  color: #333;
`;

export const Title = styled.h2`
  display: block;
  font-size: ${toEm(16)}rem;
  line-height: 1.2;
  margin-bottom: 0.6em;
`;

export const Excerpt = styled.p`
  display: block;
  font-size: 0.7619rem;
  line-height: 1.4;
  margin: 0;
  font-size: ${toEm(14)}rem;
`;
