"use client";

import React, { useState } from "react";
import { INITIAL_COLUMNS, USERS, DEFAULT_TASK_FORM } from "./constant";
import { Column as ColumnType } from "./constant";
import Header from "./components/Header";
import Column from "./components/Col";
import AddSection from "./components/AddSection";
import SplashScreen from "./components/SplashScreen";
import FloatingBackground from "./components/FloatingBackground";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>(INITIAL_COLUMNS);
  const [addingTaskInColumn, setAddingTaskInColumn] = useState<string | null>(
    null
  );
  const [newTaskForm, setNewTaskForm] = useState({ ...DEFAULT_TASK_FORM });
  const [showSplash, setShowSplash] = useState(true);

  // Adding new task
  const handleAddTask = (columnId: string) => {
    if (addingTaskInColumn === columnId) {
      if (newTaskForm.title.trim()) {
        const updatedColumns = columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: `task-${Date.now()}`,
                  title: newTaskForm.title,
                  description: newTaskForm.description,
                  dueDate: newTaskForm.dueDate,
                  assignee: newTaskForm.assigneeId
                    ? USERS.find(
                        (user) =>
                          user.id === Number.parseInt(newTaskForm.assigneeId)
                      ) || null
                    : null,
                  tag: newTaskForm.tag || null,
                  date: newTaskForm.dueDate
                    ? new Date(newTaskForm.dueDate).toLocaleDateString()
                    : null,
                  priority: newTaskForm.priority || "medium",
                },
              ],
            };
          }
          return column;
        });

        setColumns(updatedColumns);
        setNewTaskForm({ ...DEFAULT_TASK_FORM });
        setAddingTaskInColumn(null);
      }
    } else {
      // Adding to this column
      setAddingTaskInColumn(columnId);
    }
  };

  // Input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cancel add task
  const handleCancelAddTask = () => {
    setAddingTaskInColumn(null);
    setNewTaskForm({ ...DEFAULT_TASK_FORM });
  };

  // adding a new section
  const handleAddSection = (sectionName: string) => {
    setColumns([
      ...columns,
      {
        id: `section-${Date.now()}`,
        title: sectionName,
        tasks: [],
      },
    ]);
  };

  // Delete task
  const handleDeleteTask = (columnId: string, taskId: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  // Drag and drop func
  const handleDragStart = (
    e: React.DragEvent,
    columnId: string,
    taskId: string
  ) => {
    e.dataTransfer.setData("columnId", columnId);
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    const sourceColumnId = e.dataTransfer.getData("columnId");
    const taskId = e.dataTransfer.getData("taskId");

    if (sourceColumnId === targetColumnId) return;

    // Find  task in the source col
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    if (!sourceColumn) return;

    const task = sourceColumn.tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Remove from source col and add to anoter column
    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((t) => t.id !== taskId),
        };
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  return (
    <>
      <SplashScreen onComplete={() => setShowSplash(false)} />
      {!showSplash && (
        <div
          className="flex flex-col h-screen bg-white"
          style={{
            background: "linear-gradient(135deg, #f0f4ff 0%, #fff0f4 100%)",
          }}
        >
          <FloatingBackground />
          {/* Header */}
          <Header />

          {/* Board content */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex h-full min-w-max p-4 gap-4">
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  onAddTask={handleAddTask}
                  onCancelAddTask={handleCancelAddTask}
                  addingTaskInColumn={addingTaskInColumn}
                  newTaskForm={newTaskForm}
                  onInputChange={handleInputChange}
                  onDeleteTask={handleDeleteTask}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              ))}

              {/* Add section */}
              <div className="flex flex-col w-72 min-h-full">
                <AddSection onAddSection={handleAddSection} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
