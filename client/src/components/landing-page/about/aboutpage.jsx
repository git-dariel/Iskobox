import Footer from "../Homepages/footer";
import AboutPUPLopez from "./aboutpuplopez";
import AboutHeader from "./aboutheader";
import MainLayout from "@/pages/accreditors/layout/main.layout";

export default function AboutPage() {
    return(
        <section className="">
           <MainLayout>
                <AboutHeader/>
                <AboutPUPLopez/>
            </MainLayout>
        </section>

    );
}