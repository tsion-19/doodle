import React from "react";
import Header from "../Header/Header";
import Routers from "../Routers/Routers";

function Layout() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 80 }}>
        <Routers />
      </div>
    </div>
  );
}

export default Layout;
