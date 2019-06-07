import React from "react";
import {
  Placeholder,
  Wrapper,
  Container,
  Name,
  InnerName,
  MainMenu,
} from "./styles";

export default function TopBar() {
  const menuItems = [
    { label: "Home", url: "/" },
    { label: "Contact", url: "/contact" },
    { label: "Cookies", url: "/cookies" },
  ];
  return (
    <>
      <Placeholder />
      <Wrapper>
        <Container>
          <Name to="/">
            <InnerName>
              Site name maybe a very very long text which will eventualy
              overflow
            </InnerName>
          </Name>
          <MainMenu items={menuItems} />
        </Container>
      </Wrapper>
    </>
  );
}
