import React from "react";
import Sidebar from "@/Components/Sidebar/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center h-screen bg-black relative">
      <div className="fixed left-0 top-0 h-full flex items-center">
        <Sidebar />
      </div>

      <div className="w-[640px]">{children}</div>
    </div>
  );
};