import React, { useState } from "react";
import Cards from "@/components/dashboard/cards";
import mockedConfig from "@/configs/mocked.config";

function DashboardContent() {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Cards */}
      <section className="m-2">
        <Cards data={mockedConfig.dashboardCardData} />
      </section>
    </div>
  );
}

export default DashboardContent;
