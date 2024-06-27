import React, { Suspense, lazy } from "react";
import MainLayout from "@/pages/accreditors/layout/main.layout";
import SplashLazy from "@/components/lazy-loading/animate.pulse";

// Function to simulate a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lazy load the components with a delay
const Hero = lazy(() => delay(3000).then(() => import("./hero")));
const HomeContent = lazy(() => delay(3000).then(() => import("./homecontent")));
const CarouselHome = lazy(() => delay(3000).then(() => import("./carouselhome")));

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<SplashLazy />}>
        <MainLayout>
          <Hero />
          <HomeContent />
          <CarouselHome />
        </MainLayout>
      </Suspense>
    </>
  );
}
