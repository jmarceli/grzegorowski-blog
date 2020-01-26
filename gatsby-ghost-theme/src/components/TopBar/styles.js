import styled from "styled-components";
import { Link } from "gatsby";
import Menu from "../Menu";
import { ffSans, toEm } from "src/utils/typography";
import { CONTENT_MAX_WIDTH, TOP_OFFSET } from "../variables";

export const Placeholder = styled.div`
  height: ${TOP_OFFSET}px;
`;

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: #000;
  color: #fff;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
`;

export const Name = styled(Link)`
  height: 100%;
  padding: 0 24px;
  max-width: 50vw;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  font-family: ${ffSans};
  font-size: ${toEm(14)}rem;
  font-weight: 600;
`;

export const InnerName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const MainMenu = styled(Menu)`
  max-width: 50vw;
`;
