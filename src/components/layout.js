import React from "react";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, lang = "en" }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-l from-red-600 via-red-700 to-red-700">
      <Header lang={lang} />
      <main id="main" className="flex-auto">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Layout;
