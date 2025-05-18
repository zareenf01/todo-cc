import React from "react";
import { USERS, TAGS, TaskFormData } from "../constant";

interface TaskFormProps {
  form: TaskFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  form,
  onChange,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-2 p-3">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Task title"
        className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      ></textarea>
      <div className="flex gap-2 mb-2">
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={onChange}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="assigneeId"
          value={form.assigneeId}
          onChange={onChange}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select assignee</option>
          {USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 mb-2">
        <select
          name="tag"
          value={form.tag}
          onChange={onChange}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select tag</option>
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <select
          name="priority"
          value={form.priority || ""}
          onChange={onChange}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
