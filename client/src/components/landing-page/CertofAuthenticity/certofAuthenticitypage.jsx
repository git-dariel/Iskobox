import MainLayout from "@/pages/accreditors/layout/main.layout";
import CertContent from "./certcontent";
import CertHeader from "./certicateheader";



export default function CertifcateOfAuthenticity() {
  return (
    <>
      <MainLayout>
        <CertHeader />
        <CertContent />
      </MainLayout>
    </>
  );
}
