import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { ContentFeed } from "./ContentFeed";
import { CreateContentModal } from "../components/CreateContentModal";
import { ShareBrainModal } from "../components/ShareBrainModal";
export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
    const handleContentAdded = () => {
     
      setRefreshTrigger((prev) => !prev);
    };
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-8">
          <ContentFeed
            refreshTrigger={refreshTrigger}
            searchQuery={searchQuery}
          />
        </main>
        <CreateContentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleContentAdded}
        />
        <ShareBrainModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      </div>
    </div>
  );
};
