import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { ContentFeed } from "./ContentFeed";
export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
   
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
       
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAddModal={() => console.log("Open Add Modal")}
          onOpenShareModal={() => console.log("Open Share Modal")}
        />
        <main className="flex-1 overflow-y-auto p-8">
         <ContentFeed/>
        </main>
      </div>
    </div>
  );
};
