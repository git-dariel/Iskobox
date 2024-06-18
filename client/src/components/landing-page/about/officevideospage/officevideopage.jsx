import MainLayout from "@/pages/accreditors/layout/main.layout";
import OfficeVideoContent from "./officevideocontent";
import OfficeVideoHeader from "./officevideoheader";

export default function OfficeVideoPage() {
  return (
    <>
      <MainLayout>
        <OfficeVideoHeader />
        <OfficeVideoContent />
      </MainLayout>
    </>
  );
}
