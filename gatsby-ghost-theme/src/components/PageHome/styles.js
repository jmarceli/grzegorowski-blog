import styled from "styled-components";
import { Link } from "gatsby";
import {
  CONTENT_MAX_WIDTH,
  CONTENT_OVERLAP_HEIGHT,
  BP_SMALL,
  COLOR_PRIMARY,
} from "../variables";
import { ffSans, toEm } from "src/utils/typography";

export const MenuWrapper = styled.div`
  padding: 0 12px;
  margin: 0 0 -12px;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: block;
  margin: -${CONTENT_OVERLAP_HEIGHT}px auto 0;
  max-width: ${CONTENT_MAX_WIDTH}px;
  width: 100%;
  flex: 1 0 auto;
`;

export const ButtonWrapper = styled.div`
  margin: 24px 12px 48px;
  @media (min-width: ${BP_SMALL}px) {
    margin: 24px 24px 48px;
  }
  display: flex;
  justify-content: flex-end;
`;

export const ButtonMore = styled(Link)`
  color: #999;
  border-radius: 20px;
  border: 1px solid #999;
  padding: 8px 16px;
  font-size: ${toEm(12)}rem;
  font-family: ${ffSans};
  line-height: 1.2;
  min-width: 120px;
  text-align: center;

  &:hover {
    color: ${COLOR_PRIMARY};
    border-color: ${COLOR_PRIMARY};
  }
`;
