import React from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div>
      <TopBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
