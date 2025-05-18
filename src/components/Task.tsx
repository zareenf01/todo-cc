import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Task as TaskType } from "../constant";
import { motion, AnimatePresence } from "framer-motion";

interface TaskProps {
  task: TaskType;
  columnId: string;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string,
    taskId: string
  ) => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  columnId,
  onDeleteTask,
  onDragStart,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // date color
  const renderDate = (date: string | null) => {
    if (!date) return null;

    let className = "text-xs";
    if (date === "Yesterday") {
      className += " text-red-500";
    } else if (date === "Tomorrow") {
      className += " text-blue-500";
    } else {
      className += " text-gray-500";
    }

    return <span className={className}>{date}</span>;
  };

  const handleDeleteClick = () => {
    onDeleteTask(columnId, task.id);
    setActiveDropdown(false);
  };

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPriorityText = (priority: string | null) => {
    if (!priority) return "";
    return `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      whileDrag={{
        scale: 1.05,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
        rotate: 2,
      }}
      className="bg-white rounded-lg shadow-sm mb-2 p-3 relative cursor-move"
      draggable
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        onDragStart(e, columnId, task.id)
      }
    >
      {task.priority && (
        <div
          className="absolute top-1 right-2"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <motion.div
            className={`w-3 h-3 rounded-full ${getPriorityColor(
              task.priority
            )}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute right-0 top-4 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20"
              >
                {getPriorityText(task.priority)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="relative">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium pr-6">{task.title}</h3>
          <div className="dropdown-container">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="p-1 rounded hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(!activeDropdown);
              }}
            >
              <MoreHorizontal size={16} />
            </motion.button>

            <AnimatePresence>
              {activeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border dropdown-container"
                >
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-gray-600 mb-2">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-2">
          {task.tag && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
            >
              {task.tag}
            </motion.span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          {task.assignee && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ring-2 ring-white">
                {task.assignee.image ? (
                  <img
                    src={task.assignee.image}
                    alt={task.assignee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium">
                    {task.assignee.initial}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-600">
                {task.assignee.name}
              </span>
            </motion.div>
          )}

          {task.date && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center"
            >
              {renderDate(task.date)}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Task;
