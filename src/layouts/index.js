import PropTypes from "prop-types";
import AuthLayout from "./auth";
import DashBoardLayout from "./dashboard";
import NewDashBoardLayout from "./new-dashboard";
import PosLayout from "./pos";

const Layout = ({ variant = "dashboard", children }) => {

  // console.log("variant",variant);
  if (variant === "auth") {
    return (
      <AuthLayout>{children}</AuthLayout>
    );
  }

  if (variant === "pos") {
    return (
      <PosLayout>{children}</PosLayout>
    );
  }

  if(variant === "new-dashboard") {
    return (
      <NewDashBoardLayout>{children}</NewDashBoardLayout>
    );
  }

  return (
    <>
      <DashBoardLayout>{children}</DashBoardLayout>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "auth", "pos", "new-dashboard"]),
};

export default Layout;
