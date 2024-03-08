import Header from "../../components/landing-page/Header";
import Hero from "../../components/landing-page/Hero";
import AboutUs from "../../components/landing-page/about-us";
import Footer from "../../components/landing-page/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-auto">
      <Header />
      <Hero />
      <AboutUs />
      <Footer />
    </div>
  );
}
