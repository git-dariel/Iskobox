import React, { useState } from "react";
import Cards from "@/components/dashboard/cards";
import mockedConfig from "@/configs/mocked.config";

function DashboardContent() {
  return (
    <div className="flex h-screen bg-[#f8fafd] flex-1">
      {/* Cards */}
      <section className="m-2 w-[70%]">
        <Cards data={mockedConfig.dashboardCardData} />
        <section className="bg-gray-200">sdff</section>
      </section>
      <section className="bg-gray-200 w-[30%]">lksdjfl</section>
    </div>
  );
}

export default DashboardContent;