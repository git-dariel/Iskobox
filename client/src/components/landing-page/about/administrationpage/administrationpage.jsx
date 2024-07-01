import MainLayout from "@/pages/accreditors/layout/main.layout";
import AdministrationHeader from "./administrationheader";
import Designees from "./designees";
import AdministrationContent from "./administrationcontent";


export default function AdministrationPage() {
  return (
    <>
      <MainLayout>
        <AdministrationHeader />
        <AdministrationContent/>
      </MainLayout>
    </>
  );
}
