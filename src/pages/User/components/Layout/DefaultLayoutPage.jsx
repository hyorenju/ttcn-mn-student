import { FloatButton } from "antd";
import React from "react";
import { Navigate } from "./Header";
import { Contact, Footer } from "./Footer";

export function DefaultLayoutPage({ children }) {
  return (
    <div>
      <Navigate />
      {children}
      <Contact />
      <FloatButton.BackTop
        className="bg-primary-color"
        visibilityHeight={600}
      />
      <Footer />
    </div>
  );
}
