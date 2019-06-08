import React from "react";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
import Menu from "../Menu";
import { Header, Content } from "./styles";

const menuItems = [
  { label: "Home", slug: "/" },
  { label: "Contact", slug: "/contact" },
  { label: "Cookies", slug: "/cookies" },
];

export default ({ data }) => (
  <div>
    <HomeHeader />
    <Content>
      <Header>
        <Menu items={menuItems} />
      </Header>
      <CardList posts={data.allMarkdownRemark.edges} />
    </Content>
  </div>
);
