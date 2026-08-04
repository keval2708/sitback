'use client';

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/page";
import Header from "@/components/new-header/page";

const DashBoardLayout = ({ children }) => {
  const pathname = usePathname();
  // console.log("pathname", pathname);

  return (
    <>
      {pathname === "/get-started" ? (
        <>
          {children}
        </>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

export default DashBoardLayout;
