import React, { useState } from "react";
import { CrossIcon } from "./icons/PlusIcon";
import { Input } from "./ui/InputComponent";
import { Button } from "./ui/Button";
import { api } from "../services/api";

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export type ContentType = "urls" | "youtube" | "twitter";

export const CreateContentModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateContentModalProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState(""); // Raw string input for tags

  const [selectedType, setSelectedType] = useState<ContentType>("urls");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleTypeSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    t: ContentType,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedType(t);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

   
    const formattedTags = tagsInput
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter((tag) => tag.length > 0);

    try {
      await api.post("/content", {
        title,
        link,
        type: selectedType,
        contentType: selectedType,
        description,
        tags: formattedTags, 
      });

      // Reset form
      setTitle("");
      setLink("");
      setDescription("");
      setTagsInput("");
      setSelectedType("urls");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Add New Content
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <CrossIcon size="md" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Title"
            type="text"
            placeholder="e.g. Masterclass on System Design"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Description"
            rows={3}
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            label="URL Link"
            type="url"
            placeholder="https://..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />

          {/* Tags Input Section */}
          <Input
            label="Tags (comma separated)"
            type="text"
            placeholder="e.g. react, nodejs, webdev"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />

          {/* Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(["link", "youtube", "twitter"] as ContentType[]).map((t) => {
                const isActive = selectedType === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={(e) => handleTypeSelect(e, t)}
                    className={`py-2 text-xs font-medium rounded-xl border capitalize transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-50 border-blue-600 text-blue-600 font-bold shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {t === "urls" ? "URL" : t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <Button  variant="secondary"
              title="Cancel"
              onClick={onClose}
            />
            <Button
              type='submit'
              variant="primary"
              title={loading ? "Adding..." : "Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
