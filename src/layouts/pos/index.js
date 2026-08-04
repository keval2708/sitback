'use client';

import { usePathname, useRouter } from 'next/navigation'; // Import useRouter and usePathname
import Footer from '@/components/footer/page';
import Header from '@/components/new-header/page';





const PosLayout = ({ children }) => {
  const router = useRouter(); // Initialize the router
  const pathname = usePathname(); // Get the current path

  // Define the path for the list page where the Back button should be shown
  const isListPage = pathname === '/list';

  return (
    // <MainPosLayoutWeapper>
    //   <div className="pos-sidebar-wrapper">
    //     <PosSideBar />
    //   </div>
    //   <div className="pos-main-layout-wrapper">
    //     <div className="container">
    //       {isListPage && (
    //         <button
    //           className="backbtn-wrapper-main"
    //           onClick={() => router.back()} // Navigate to the previous page on click
    //         >
    //           <InlineSVG
    //             src={backtohomeIcon}
    //             className="global_laguage_icon"
    //           />
    //           Back
    //         </button>
    //       )}
    //     </div>
    //     {children}
    //   </div>
    // </MainPosLayoutWeapper>
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

export default PosLayout;
