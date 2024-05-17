import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import styled from 'styled-components';

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {

  return (
    <PortalLayoutStl>
       <Navbar layoutType="PortalLayout"/>
      <main>{children}</main>
     <Footer/>
    </PortalLayoutStl>
  );
}

export const PortalLayoutStl = styled.div`
    margin-top:100px
`;