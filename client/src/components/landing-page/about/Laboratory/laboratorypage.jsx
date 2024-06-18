import MainLayout from "@/pages/accreditors/layout/main.layout";
import LabContent from "./labcontent";
import LabHeader from "./labheader";

export default function LaboratoryPage() {
  return (
    <>
      <MainLayout>
        <LabHeader />
        <LabContent />
      </MainLayout>
    </>
  );
}
