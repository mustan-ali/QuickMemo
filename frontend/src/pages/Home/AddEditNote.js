import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const AddEditNote = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const addNewNote = async () => {};
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }

    if (!content) {
      setError("Content is required");
      return;
    }

    if (type === "add") {
      addNewNote();
    } else if (type === "edit") {
      editNote();
    }
  };

  const handleAddTag = () => {
    if (inputTag.trim() !== "") {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute right-3 top-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Test Note"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="This is a test note"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 text-sm bg-slate-100 text-slate-900 px-3 py-1 rounded"
              >
                #{tag}
                <button
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                  className=""
                >
                  <MdClose />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 mt-3">
          <input
            type="text"
            className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
            placeholder="Add tags"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
          />
          <button
            className="w-8 h-8 flex items-center justify-center rounded border-blue-700 hover:bg-blue-700"
            onClick={handleAddTag}
          >
            <MdAdd className="text-2xl text-blue-700 hover:text-white" />
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNote;
