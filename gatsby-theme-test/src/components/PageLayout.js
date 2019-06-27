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
  flex-direction: column;
  justify-content: center;
`;

export default function PageLayout({ children, singlePage, opaque }) {
  return (
    <Wrapper>
      {singlePage && <TopBar opaque={opaque} />}
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
}
