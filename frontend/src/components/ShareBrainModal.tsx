import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { CrossIcon } from "./icons/PlusIcon";
import { api } from "../services/api";

interface ShareBrainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareBrainModal = ({ isOpen, onClose }: ShareBrainModalProps) => {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if link already exists on mount/open
  useEffect(() => {
    if (isOpen) {
      handleToggleShare(true, true); // Check status silently
    } else {
      setShareUrl("");
      setError("");
    }
  }, [isOpen]);

  const handleToggleShare = async (enable: boolean, isInitialCheck = false) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/brain/share", { share: enable });

      if (enable && response.data.hash) {
        const fullLink = `${window.location.origin}/share/${response.data.hash}`;
        setShareUrl(fullLink);
      } else if (!enable) {
        setShareUrl("");
      }
    } catch (err: any) {
      if (!isInitialCheck) {
        setError(
          err.response?.data?.message || "Failed to update share status",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  const isShared = Boolean(shareUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Share Your Brain
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <CrossIcon size="md" />
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Share your entire collection of notes, videos, and tweets with anyone
          using a public link.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Toggle Switch */}
        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200/80 rounded-xl">
          <span className="text-xs font-semibold text-gray-700">
            Public Access
          </span>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleToggleShare(!isShared)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isShared ? "bg-blue-600" : "bg-gray-300"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isShared ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* URL Box & Actions */}
        {shareUrl ? (
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-mono break-all select-all">
              {shareUrl}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="secondary" title="Close" onClick={onClose} />
              <Button
                variant="primary"
                title={copied ? "Copied!" : "Copy Link"}
                onClick={handleCopy}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" title="Cancel" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};
