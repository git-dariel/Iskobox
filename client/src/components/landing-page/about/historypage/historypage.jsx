import MainLayout from "@/pages/accreditors/layout/main.layout";
import HistoryContent from "./historycontent";
import HistoryHeader from "./historyheader";

export default function HistoryPage() {
  return (
    <>
      <MainLayout>
        <HistoryHeader />
        <HistoryContent />
      </MainLayout>
    </>
  );
}
