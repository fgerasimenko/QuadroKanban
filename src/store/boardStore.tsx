import { createContext, useContext, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Task } from "../types/taskTypes";
import { defaultFilters } from "../domain/taskFilters";
import type { TaskFilters } from "../domain/taskFilters";

type User = {
  id: string;
  name: string;
};

type CreateTaskInput = {
  title: string;
  longDescription: string;
  priority: Task["priority"];
  deadline: Date;
  shortDescription?: string;
  assignedTo?: Task["assignedTo"];
};

type BoardStore = {
  tasks: Task[];
  filters: TaskFilters;
  selectedTaskId: string | null;
  editingTaskId: string | null;
  showArchived: boolean;
  currentUser: User;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  patchFilters: (patch: Partial<TaskFilters>) => void;
  setSelectedTaskId: (id: string | null) => void;
  setEditingTaskId: (id: string | null) => void;
  setShowArchived: (value: boolean) => void;
  toggleShowArchived: () => void;
  createTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  archiveTask: (id: string) => void;
  unarchiveTask: (id: string) => void;
};

type BoardProviderProps = {
  initialTasks: Task[];
  currentUser: User;
  children: ReactNode;
};

const BoardStoreContext = createContext<BoardStore | null>(null);

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const sortByOrder = (a: Task, b: Task) => a.order - b.order;

export function BoardProvider({ initialTasks, currentUser, children }: BoardProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const patchFilters = (patch: Partial<TaskFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const createTask = (input: CreateTaskInput) => {
    setTasks((prev) => {
      const activeTodo = prev
        .filter((t) => t.status === "TODO" && !t.archived)
        .sort(sortByOrder);
      const nextOrder = activeTodo.length ? activeTodo[activeTodo.length - 1].order + 1 : 0;

      const next: Task = {
        id: createId(),
        title: input.title,
        longDescription: input.longDescription,
        shortDescription: input.shortDescription,
        priority: input.priority,
        status: "TODO",
        assignedTo: input.assignedTo ?? currentUser,
        deadline: input.deadline,
        createdAt: new Date(),
        updatedAt: new Date(),
        order: nextOrder,
        archived: false,
      };

      return [...prev, next];
    });
  };

  const updateTask = (id: string, patch: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date() } : t))
    );
  };

  const archiveTask = (id: string) => {
    console.log(id)
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, archived: true, archivedAt: new Date(), updatedAt: new Date() }
          : t
      )
    );
  };

  const unarchiveTask = (id: string) => {
    setTasks((prev) => {
      const activeTodo = prev
        .filter((t) => t.status === "TODO" && !t.archived)
        .sort(sortByOrder);
      const nextOrder = activeTodo.length ? activeTodo[activeTodo.length - 1].order + 1 : 0;

      return prev.map((t) =>
        t.id === id
          ? {
              ...t,
              archived: false,
              archivedAt: undefined,
              status: "TODO",
              order: nextOrder,
              updatedAt: new Date(),
            }
          : t
      );
    });
  };

  const value = useMemo(
    () => ({
      tasks,
      filters,
      selectedTaskId,
      editingTaskId,
      showArchived,
      currentUser,
      setTasks,
      patchFilters,
      setSelectedTaskId,
      setEditingTaskId,
      setShowArchived,
      toggleShowArchived: () => setShowArchived((prev) => !prev),
      createTask,
      updateTask,
      archiveTask,
      unarchiveTask,
    }),
    [
      tasks,
      filters,
      selectedTaskId,
      editingTaskId,
      showArchived,
      currentUser,
    ]
  );

  return <BoardStoreContext.Provider value={value}>{children}</BoardStoreContext.Provider>;
}

export function useBoardStore() {
  const ctx = useContext(BoardStoreContext);
  if (!ctx) {
    throw new Error("Erro de contexto");
  }
  return ctx;
}
