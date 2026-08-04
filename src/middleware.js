import { NextResponse } from "next/server";
import { checkLogin } from "./utils/helper";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log("middleware executed");

  const { id, isSubscribe, spaType } = await checkLogin(request.cookies.get("token")?.value);
  // console.log("isSubscribe",isSubscribe);
  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/reset-new-password" ||
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname == "/signup";

    // console.log("loggedInUserNotAccessPaths",loggedInUserNotAccessPaths);
    // console.log("id",id);
    // console.log("request.nextUrl.pathnam",request.nextUrl.pathname);

  if (loggedInUserNotAccessPaths) {
    // access not secured route
    if (id) {
      if (isSubscribe) {
        if(spaType == "onlydashboard") {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/select-profile", request.url));
      }
      return NextResponse.redirect(new URL("/subscriptions", request.url));
      // return NextResponse.redirect(new URL("/dashboard", request.url));

    }
  } else {
    // accessing secured route

    if (!id) {

      // return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      // verify...
    }
  }

  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    // "/login",
    "/signup",
    "/signin",
    "/list",
    "/add",
    "/employee-hours",
    "/reset-new-password",
    "/appointments",
    "/faq",
    "/insights",
    "/notification",
    "/subscriptions",
    "/profile-services",
    "/service-provider",
    "/dashboard",
    "/profile",
    "/select-profile",
    "/therapists-profile",
    "/therapists-profile/:path*",
    "/pos",
    "/pos-list",
    "/pos-inventory",
    "/get-started",
  ],
};
