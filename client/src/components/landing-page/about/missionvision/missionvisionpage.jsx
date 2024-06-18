import MVHeader from "@/components/landing-page/about/missionvision/mvheader";
import MVContent from "./mvcontent";
import MainLayout from "@/pages/accreditors/layout/main.layout";

export default function MissionVision() {
  return (
    <>
      <MainLayout>
        <MVHeader />
        <MVContent />
      </MainLayout>
    </>
  );
}
