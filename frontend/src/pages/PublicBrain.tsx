import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Card } from "../components/ui/Card";

interface SharedUser {
  username: string;
  email: string;
}

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  contentType: "youtube" | "twitter"  | "link";
  description?: string;
  tags?: string[];
}

export const PublicBrain = () => {
  const { sharelink } = useParams<{ sharelink: string }>();
  const [user, setUser] = useState<SharedUser | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicContent = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/brain/${sharelink}`);
        setUser(response.data.user);
        setContent(response.data.content);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Invalid or expired share link"
        );
      } finally {
        setLoading(false);
      }
    };

    if (sharelink) fetchPublicContent();
  }, [sharelink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading Second Brain...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm text-center max-w-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Brain Not Found
          </h2>
          <p className="text-xs text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue font-bold text-xs flex items-center justify-center uppercase">
            {user?.username?.[0] || "U"}
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              {user?.username}'s Brain
            </h1>
            <p className="text-[10px] text-gray-400">{user?.email}</p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 bg-blue-50 text-blue font-medium rounded-full border border-blue-100">
          Public View
        </span>
      </header>

     
      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        {content.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-xs">
            No public content saved in this brain yet.
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {content.map((item) => (
            <Card
            key={item._id}
            id={item._id}
            title={item.title}
            link={item.link}
            description={item.description}
            tags={item.tags}
            contentType={item.contentType}
            />
        ))}
    </div>
          
        )}
      </main>
    </div>
  );
};