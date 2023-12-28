import { FloatButton } from 'antd';
import React from 'react';
import { Navigate } from './Header';
import { Contact, Footer } from './Footer';

export function DefaultLayoutPage({ children }) {
  return (
    <div>
      <Navigate />
      {children}
      <Contact />
      <FloatButton.BackTop
        visibilityHeight={600}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Footer />
    </div>
  );
}
