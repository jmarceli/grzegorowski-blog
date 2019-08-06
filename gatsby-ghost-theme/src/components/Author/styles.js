import { Link } from "gatsby";
import styled from "styled-components";
import { ffSans, toEm } from "src/utils/typography";
import { BP_SMALL, COLOR_PRIMARY } from "../variables";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 24px 0 16px;
  @media (min-width: ${BP_SMALL}px) {
    margin: 48px 0 24px;
  }
`;

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  font-family: ${ffSans};
  color: #000;
`;

export const Photo = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  margin-left: 12px;
  @media (min-width: ${BP_SMALL}px) {
    margin-left: 16px;
  }
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: ${toEm(20)}rem;
  line-height: 1.2;
`;

export const About = styled.div`
  padding: 0;
  color: #666;
  margin-top: 4px;
  font-size: ${toEm(13)}rem;
  line-height: 1.2;
`;

export const More = styled(Link)`
  color: #999;
  border-radius: 20px;
  border: 1px solid #999;
  padding: 8px 16px;
  font-size: ${toEm(12)}rem;
  font-family: ${ffSans};
  line-height: 1.2;

  display: none;
  @media (min-width: ${BP_SMALL}px) {
    display: block;
  }

  &:hover {
    color: ${COLOR_PRIMARY};
    border-color: ${COLOR_PRIMARY};
  }
`;
