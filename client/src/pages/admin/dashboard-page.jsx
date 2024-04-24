import React, { useState } from "react";
import Cards from "@/components/dashboard/cards";
import { dashboardCardData } from "@/configs/common.config";

function DashboardContent() {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Cards */}
      <section className="m-2">
        <Cards data={dashboardCardData} />
      </section>
    </div>
  );
}

export default DashboardContent;
