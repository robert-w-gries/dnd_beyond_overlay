import React from "react";
import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode}) => (
  <div className="flex flex-col w-100 h-100">
    <nav className="flex">
      <Link className="border border-solid" to='character/10'>Character Sheet</Link>
    </nav>
    {children}
  </div>
)