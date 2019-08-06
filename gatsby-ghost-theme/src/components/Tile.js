import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex: 1 0 100%;
  width: 100%;
  border-radius: 5px;
  overflow: hidden; // ensures border-radius for sub-elements
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
  transition: transform 0.1s ease-in;
  transform: scale(1);

  &:hover {
    transform: scale(1.01);
  }
`;

export default function Tile({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
