import styled from "styled-components";
import { ffSans, toEm } from "src/utils/typography";
import { CONTENT_OVERLAP_HEIGHT } from "../variables";

export const Wrapper = styled.header`
  padding-bottom: ${CONTENT_OVERLAP_HEIGHT}px;
  min-height: 250px;
  height: 30vh;
  background: #090a0b;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
