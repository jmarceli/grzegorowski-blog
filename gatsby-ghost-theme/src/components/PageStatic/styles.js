import styled from "styled-components";
import Img from "gatsby-image";
import {
  BP_SMALL,
  BP_MEDIUM,
  BP_LARGE,
  CONTENT_MAX_WIDTH,
  ARTICLE_OFFSET_TOP,
  CONTENT_OVERLAP_HEIGHT,
  TOP_OFFSET,
} from "../variables";

export const Wrapper = styled.article`
  width: 100%;
`;

export const Header = styled.header`
  font-size: 1rem;
  background: #fff;
  text-align: center;
  position: absolute;
  z-index: 100;
  top: ${TOP_OFFSET}px;
  left: 0;
  width: 100%;
`;

export const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
  padding: 2em 8px 1em;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 0 0 12px;
  font-weight: 600;
`;

export const AuthorInfo = styled.div`
  font-size: 1rem;
  display: flex;
  text-align: left;
`;

export const Photo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #000;
  margin-right: 12px;
`;

// TODO: font-size
export const Name = styled.div`
  font-size: 16px;
`;

// TODO: font-size
export const Info = styled.div`
  font-size: 16px;
`;

export const TopImage = styled.div`
  position: fixed;
  left: 0;
  top: ${ARTICLE_OFFSET_TOP}px;
  margin-top: -${ARTICLE_OFFSET_TOP}px;
  width: 100%;
  height: ${ARTICLE_OFFSET_TOP}px;
  overflow: hidden;
  z-index: -1;
  background: #090a0b;
`;

export const HeaderImage = styled(Img)`
  z-index: -1;
  min-width: 100%;
  min-height: 100%;
  max-width: none;
  transform: translateX(-50%) translateY(-50%);
  position: relative;
  left: 50%;
  top: 50%;
`;

export const Main = styled.div`
  position: relative;
  margin-top: ${ARTICLE_OFFSET_TOP}px;
  z-index: 100;
  display: flex;
  width: 100%;
  background: #fff;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${CONTENT_MAX_WIDTH}px;
  margin: -${CONTENT_OVERLAP_HEIGHT}px auto 0;
  background: #fff;
  flex: 1 0 auto;

  padding: 36px 8px 12px;
  @media (min-width: ${BP_SMALL}px) {
    padding: 36px 24px 12px;
  }
  @media (min-width: ${BP_MEDIUM}px) {
    padding: 36px 48px 12px;
  }

  @media (min-width: ${BP_LARGE}px) {
    ::before,
    ::after {
      content: "";
      position: absolute;
      top: 15px;
      z-index: -1;
      display: block;
      width: 20px;
      height: 200px;
      background: rgba(39, 44, 49, 0.15);
      filter: blur(5px);
    }

    ::before {
      left: -2px;
      transform: rotate(-2deg);
    }
    ::after {
      right: -2px;
      transform: rotate(2deg);
    }
  }
`;

export const MenuWrapper = styled.div`
  padding: 0 12px;
  margin: 0 0 -12px;
`;

export const Content = styled.div`
  a {
    border-bottom: 1px solid #111;
  }
  .gatsby-resp-image-figure a {
    border-bottom: none;
  }
`;
