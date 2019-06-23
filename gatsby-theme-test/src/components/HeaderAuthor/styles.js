import styled from "styled-components";
import Img from "gatsby-image";
import { ffSans, toEm } from "src/utils/typography";
import { CONTENT_OVERLAP_HEIGHT } from "../variables";

export const Wrapper = styled.header`
  position: relative;
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
  font-size: ${toEm(15)}rem;
`;

export const Avatar = styled(Img)`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 6px hsla(0, 0%, 100%, 0.1);
`;

export const Title = styled.h1`
  font-family: ${ffSans};
  font-size: ${toEm(24)}rem;
  font-weight: 600;
  margin: 12px 0;
`;

export const Contact = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

export const Email = styled.a`
  color: inherit;
  margin-left: 20px;
`;

export const Accounts = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

export const Account = styled.a`
  display: block;
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
`;
