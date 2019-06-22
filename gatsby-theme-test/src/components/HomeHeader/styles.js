import styled from "styled-components";
import Img from "gatsby-image";
import { ffSans, toEm } from "src/utils/typography";
import { CONTENT_OVERLAP_HEIGHT } from "../variables";

export const Wrapper = styled.header`
  position: relative;
  padding-bottom: ${CONTENT_OVERLAP_HEIGHT}px;
  min-height: 400px;
  height: 30vh;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Background = styled(Img)`
  position: absolute !important;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export const Container = styled.div`
  padding: 12px 24px;
  max-width: 900px;
`;

export const Title = styled.h1`
  font-family: ${ffSans};
  font-size: ${toEm(24)}rem;
  font-weight: 600;
  margin: 0 0 6px;
`;

export const Description = styled.div`
  font-family: ${ffSans};
  font-size: ${toEm(16)}rem;
  font-weight: 300;
`;
