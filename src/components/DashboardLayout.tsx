import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar hideGetStarted showUserControls />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
