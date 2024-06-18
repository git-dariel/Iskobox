import MainLayout from "@/pages/accreditors/layout/main.layout";
import FacilitiesHeader from "./facilitiesheader";
import FacilitiesContent from "./facilitiescontent";


export default function FacilitiesPage() {
    return(
        <>
         <MainLayout>
            <FacilitiesHeader/>
            <FacilitiesContent/>
         </MainLayout>
        </>
    )
}