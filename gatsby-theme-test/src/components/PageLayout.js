import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import Footer from "./Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
`;

export default function PageLayout({ children }) {
  return (
    <Wrapper>
      <TopBar />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
}
