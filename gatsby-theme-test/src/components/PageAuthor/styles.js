import styled from "styled-components";
import { BP_SMALL, BP_MEDIUM, CONTENT_MAX_WIDTH } from "../variables";

export const Contact = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  max-width: 100%;
  padding: 0 24px;
`;

export const Posts = styled.div`
  margin-left: 20px;
  justify-content: center;
`;

export const Account = styled.a`
  display: block;
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${CONTENT_MAX_WIDTH}px;
  margin: -100px auto 0;

  padding: 36px 8px 12px;
  @media (min-width: ${BP_SMALL}px) {
    padding: 36px 24px 12px;
  }
  @media (min-width: ${BP_MEDIUM}px) {
    padding: 36px 48px 12px;
  }
`;

export const Content = styled.div`
  display: block;
`;
