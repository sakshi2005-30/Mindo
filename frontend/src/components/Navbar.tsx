import { useLocation } from "react-router-dom";
import { Button } from "./ui/Button";
import { PlusIcon, ShareIcon, SearchIcon } from "./icons/PlusIcon";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal?: () => void;
  onOpenShareModal?: () => void;
}

export const Navbar = ({
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onOpenShareModal,
}: NavbarProps) => {
  const location = useLocation();

  
  const getHeaderTitle = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "youtube":
        return "YouTube";
      case "twitter":
        return "Twitter / X";
      case "urls":
      case "link":
        return "URLs";
      default:
        return "My Brain";
    }
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
    
      <h1 className="text-lg font-bold font-serif text-gray-900 tracking-tight">
        {getHeaderTitle()}
      </h1>

      <div className="flex items-center gap-4">
      
        <div className="relative flex items-center w-64">
         
          <span className="absolute left-3 z-10 text-gray-400 pointer-events-none flex items-center">
            <SearchIcon size="md" />
          </span>

        
          <input
            type="text"
            placeholder="Search your brain..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-gray-800 placeholder-gray-400 bg-white outline-none focus:border-blue focus:shadow-[0_0_8px_rgba(226,234,251,1)] focus-within:shadow-[0_0_8px_rgba(226,234,251,1)] transition-all duration-200"
          />
        </div>
        {/* Share Brain Button */}
        <Button
          variant="secondary"
          title="Share Brain"
          startIcon={<ShareIcon size="md" />}

        ></Button>

        {/* Add Content Button */}
        <Button
          title="Add Content"
          variant="primary"
          onClick={onOpenAddModal}
          startIcon={<PlusIcon size="md" />}
        ></Button>
      </div>
    </header>
  );
};
