import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.js";

function Layout() {
  const location = useLocation();
  const hideNavbarOn = ["/", "/register"];
  const hideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet /> {/* yahi pe sab page render honge */}
    </>
  );
}

export default Layout;
