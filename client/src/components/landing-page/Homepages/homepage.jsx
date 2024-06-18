import React from "react";
import HomeContent from "./homecontent";
import Hero from "./hero";
import CarouselHome from "./carouselhome";
import MainLayout from "@/pages/accreditors/layout/main.layout";
import Footer from "@/pages/accreditors/layout/footer";

export default function HomePage() {
  return (
    <>
      <MainLayout>
        <Hero />
        <HomeContent />
        <CarouselHome />
      </MainLayout>
    </>
  );
}
