import React from "react";
import PUPLOGO from "../../assets/pup-logo.png";

// Define the LazyLayout component directly
const LazyLayout = ({ children }) => <div className="lazy-layout">{children}</div>;

function SplashLazy() {
  return (
    <LazyLayout>
      <main className="flex items-center justify-center h-screen bg-red-800">
        <div>
          <div className="gap-5">
            <span className="relative flex">
              <div className="relative rounded-full p-3 z-40">
                <img src={PUPLOGO} alt="" className="h-44 p-5" />
              </div>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            </span>
          </div>

          <h1 className="animate-pulse mt-52 text-lg text-white font-semibold text-center">
            Please wait...
          </h1>
        </div>
      </main>
    </LazyLayout>
  );
}

export default SplashLazy;
