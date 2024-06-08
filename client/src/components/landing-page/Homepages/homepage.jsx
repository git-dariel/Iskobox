import React from "react";
import HomeContent from "./homecontent";
import Hero from "./hero";
import Footer from "./footer";
import CarouselHome from "./carouselhome";


export default function HomePage() {
  return (
    <>
      <div className=" h-screen overflow-y-auto">
        <Hero />
        <HomeContent />
        <CarouselHome/>
        <Footer />
      </div>
    </>
  );
}
