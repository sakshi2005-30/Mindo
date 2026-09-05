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

        {shareUrl ? (
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-mono break-all select-all">
              {shareUrl}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleToggleShare(false)}
                disabled={loading}
                className="text-xs font-semibold text-red-500 hover:text-red-700 transition cursor-pointer"
              >
                Disable Share Link
              </button>

              <div className="flex gap-2">
                <Button variant="secondary" title="Close" onClick={onClose} />
                <Button
                  variant="primary"
                  title={copied ? "Copied!" : "Copy Link"}
                  onClick={handleCopy}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" title="Cancel" onClick={onClose} />
            <Button
              variant="primary"
              title={loading ? "Generating..." : "Generate Share Link"}
             
              onClick={() => handleToggleShare(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
