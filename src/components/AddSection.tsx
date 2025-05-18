import React, { useState } from "react";
import { Plus } from "lucide-react";

interface AddSectionProps {
  onAddSection: (sectionName: string) => void;
}

const AddSection: React.FC<AddSectionProps> = ({ onAddSection }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [sectionName, setSectionName] = useState<string>("");

  const handleAdd = () => {
    if (isAdding) {
      if (sectionName.trim()) {
        onAddSection(sectionName);
        setSectionName("");
      }
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };

  if (isAdding) {
    return (
      <div className="bg-white rounded-lg border p-3">
        <input
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="Section name"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsAdding(false)}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="border border-dashed rounded-lg p-3 text-gray-500 hover:bg-gray-50 flex items-center justify-center"
    >
      <Plus className="w-4 h-4 mr-2" size={16} />
      Add section
    </button>
  );
};

export default AddSection;
