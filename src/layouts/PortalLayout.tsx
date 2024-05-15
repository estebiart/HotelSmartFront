import React from "react";
import { Navbar } from "../components";
import { Footer } from "../components/Footer";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {

  return (
    <>
       <Navbar layoutType="PortalLayout"/>
      <main>{children}</main>
     <Footer/>
    </>
  );
}