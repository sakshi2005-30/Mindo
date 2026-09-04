import { api } from "../services/api";
import { Card } from "../components/ui/Card"
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  description?: string;
  tags?: string[];
  contentType:  "link" | "youtube" | "twitter";
}

interface ContentFeedProps {
  refreshTrigger?: boolean;
  searchQuery?: string;
}

export const ContentFeed = ({
  refreshTrigger,
  searchQuery = "",
}: ContentFeedProps) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop() || "all";

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await api.get("/content");
      const items = res.data.content || res.data || [];
      setContent(items);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [refreshTrigger]);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await api.delete(`/content/${id}`);
      setContent((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  // Filter items by Route Path & Navbar Search Query
  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      // Route Filter
      const matchesType =
        currentPath === "dashboard" ||
        currentPath === "" ||
        item.contentType === currentPath ||
        (currentPath === "urls" && item.contentType === "link");

      // Search Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [content, currentPath, searchQuery]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="w-74 h-96 bg-gray-200/60 animate-pulse rounded-lg border border-gray-200"
          />
        ))}
      </div>
    );
  }

  if (filteredContent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-gray-200 rounded-2xl">
        <p className="text-gray-500 text-sm font-medium">No content found</p>
        <p className="text-gray-400 text-xs mt-1">
          Try adding new items or changing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {filteredContent.map((item) => (
        <Card
          key={item._id}
          id={item._id}
          onDelete={handleDelete}
          title={item.title}
          link={item.link}
          description={item.description}
          tags={item.tags}
          contentType={item.contentType}
         
        />
      ))}
    </div>
  );
};
