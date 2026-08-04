// import { Inter } from 'next/font/google'
"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mySelectedServiceList } from "@/redux/service";
import { PATH_DASHBOARD } from "@/routes/paths";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Sitback - Service Provider',
//   description: 'Sitback and relax',
// }


export default function AuthLayout({ children }) {
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const pathname = usePathname();

    useEffect(() => {
      if(searchParams.get("id") == null) {
        dispatch(mySelectedServiceList(null));
      }
  }, [searchParams,pathname]);

   useEffect(() => {

      if (pathname != PATH_DASHBOARD?.subscriptions) {
        document.body.classList.remove("sitback-light-yellow-bg-wrapper");
      } else {
        //document.body.classList.add("sitback-light-yellow-bg-wrapper");
      }
    }, [pathname]);

     useEffect(() => {
        const chatbotIcon = document.getElementById('chatbot-icon');
        if (chatbotIcon) {
          chatbotIcon.style.display = 'flex';
        }
      }, [pathname]);

  return (
    // <html lang="en">
      <div > {children} </div>
    // </html>
  )
}
