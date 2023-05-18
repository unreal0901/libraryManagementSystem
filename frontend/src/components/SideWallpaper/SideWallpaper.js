import React from "react";
import { Outlet } from "react-router-dom";

const SideWallpaper = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="hidden md:block w-1/2 bg-[#805AD5]"></div>
      <Outlet />
    </div>
  );
};

export default SideWallpaper;
