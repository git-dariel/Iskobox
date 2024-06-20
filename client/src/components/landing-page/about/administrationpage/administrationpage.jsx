import MainLayout from "@/pages/accreditors/layout/main.layout";
import AdministrationHeader from "./administrationHeader";
import AdministrationContent from "./administrationcontent";

export default function AdministrationPage() {
  return (
    <>
      <MainLayout>
        <AdministrationContent />
        <AdministrationHeader />
      </MainLayout>
    </>
  );
}
