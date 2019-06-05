import React from "react";
import { Placeholder, Name, Wrapper, Container } from "./styles";
import Menu from "../Menu";

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
          <Name to="/">Site name</Name>
          <Menu items={menuItems} />
        </Container>
      </Wrapper>
    </>
  );
}
