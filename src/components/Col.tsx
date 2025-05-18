import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { Column as ColumnType, TaskFormData } from "../constant";
import { motion, AnimatePresence } from "framer-motion";

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  onCancelAddTask: () => void;
  addingTaskInColumn: string | null;
  newTaskForm: TaskFormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string,
    taskId: string
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onAddTask,
  onCancelAddTask,
  addingTaskInColumn,
  newTaskForm,
  onInputChange,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-72 min-h-full"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium">{column.title}</h2>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => onAddTask(column.id)}
          >
            <Plus size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="p-1 rounded hover:bg-gray-100"
          >
            <MoreHorizontal size={16} />
          </motion.button>
        </div>
      </div>
      <motion.div
        className="flex-1 bg-gray-50 rounded-lg p-2"
        initial={false}
        animate={{ backgroundColor: "#f9fafb" }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Task form */}
        <AnimatePresence>
          {addingTaskInColumn === column.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <TaskForm
                form={newTaskForm}
                onChange={onInputChange}
                onCancel={onCancelAddTask}
                onSubmit={() => onAddTask(column.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tasks */}
        <AnimatePresence>
          {column.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              columnId={column.id}
              onDeleteTask={onDeleteTask}
              onDragStart={onDragStart}
            />
          ))}
        </AnimatePresence>

        {/* Add task button */}
        {column.tasks.length === 0 && addingTaskInColumn !== column.id ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => onAddTask(column.id)}
            className="w-full flex items-center justify-center text-gray-500 py-2 px-3 hover:bg-gray-100 rounded-md"
          >
            <Plus className="w-4 h-4 mr-2" size={16} />
            Add task
          </motion.button>
        ) : (
          column.tasks.length > 0 &&
          addingTaskInColumn !== column.id && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => onAddTask(column.id)}
              className="w-full flex items-center justify-center text-gray-500 py-2 px-3 hover:bg-gray-100 rounded-md mt-2"
            >
              <Plus className="w-4 h-4 mr-2" size={16} />
              Add task
            </motion.button>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default Column;
