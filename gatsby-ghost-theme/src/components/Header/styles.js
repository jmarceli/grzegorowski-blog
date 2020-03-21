import styled from "styled-components";
import Img from "gatsby-image";
import { ffSans, toEm } from "src/utils/typography";
import { CONTENT_OVERLAP_HEIGHT } from "../variables";

export const Wrapper = styled.header`
  position: relative;
  padding-top: ${({ withTopBar }) => (withTopBar ? 0 : 50)}px;
  padding-bottom: ${({ withTopBar }) =>
    withTopBar ? 0 : CONTENT_OVERLAP_HEIGHT}px;
  min-height: ${({ withTopBar, large }) =>
    withTopBar ? 450 : large ? 600 : 400}px;
  height: 30vh;
  color: ${({ white }) => (white ? "#aaa" : "#fff")};
  background: ${({ white }) => (white ? "#fff" : "rgba(0, 0, 0, 0.6)")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const BackgroundMobile = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Background = styled(Img)`
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export const NoBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: ${({ white }) => (white ? "#fff" : "#000")};
`;

export const Container = styled.div`
  padding: 12px 24px;
  max-width: 900px;
  font-size: ${toEm(15)}rem;
`;

export const AvatarMobile = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 6px hsla(0, 0%, 100%, 0.1);
  width: 100px;
  height: 100px;
  display: inline-block;
`;

export const Avatar = styled(Img)`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 6px hsla(0, 0%, 100%, 0.1);
`;

export const Title = styled.h1`
  font-family: ${ffSans};
  font-size: ${({ large }) => toEm(large ? 128 : 24)}rem;
  font-weight: 600;
  margin: 12px 0;
`;

export const Description = styled.h2`
  font-family: ${ffSans};
  font-size: ${toEm(16)}rem;
  font-weight: 400;
  margin: 0;
`;
