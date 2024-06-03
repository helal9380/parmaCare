/** @format */

import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber/Navber";
import Footer from "../Pages/Footer/Footer";

const Main = () => {
  return (
    <div>
      {/* navber  */}
      <Navber></Navber>

      {/* Outlet */}
      <div className="min-h-[calc(100vh-288px)]">
        <Outlet></Outlet>
      </div>

      {/* Footer here */}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
