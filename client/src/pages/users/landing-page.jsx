
import HomePage from "@/components/landing-page/Homepages/homepage.jsx";
import Header from "../../components/landing-page/Header/header.jsx";
// import Hero from "../../components/landing-page/hero";
// import AboutUs from "../../components/landing-page/about-us";
// import Footer from "../../components/landing-page/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-auto">
      <div >
        {/* <Header /> */}
   <HomePage/>
        {/* <div>
          <Hero />
          <div>
            <AboutUs />
            <div>
              <Footer />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
