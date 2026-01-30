import { toDate } from "@/utils/dateUtils";
import { Task, TaskPriority, TaskStatus } from "../types/taskTypes";
import { includesText } from "@/utils/textUtils";

export type TaskFilters = {
  query: string;
  priority: TaskPriority | "ALL";
  location: string | "ALL";
  status: TaskStatus | "ALL";
  dateFrom: string;
  dateTo: string;
};

export const defaultFilters: TaskFilters = {
  query: "",
  priority: "ALL",
  location: "ALL",
  status: "ALL",
  dateFrom: "",
  dateTo: "",
};

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const q = filters.query.trim().toLowerCase();
  const from = toDate(filters.dateFrom);
  const to = toDate(filters.dateTo);

  return tasks.filter((t) => {

    if (q) {
      const blob = [
        t.title,
        t.location,
        t.longDescription,
        t.priority,
        t.status,
      ].join(" | ");

      if (!includesText(blob, q)) { return false; }
    }
    
    if (filters.location !== "ALL" && t.location !== filters.location) { return false; }

    if (filters.priority !== "ALL" && t.priority !== filters.priority) { return false; }

    if (filters.status !== "ALL" && t.status !== filters.status) { return false; }

    if (from || to) {
      const deadline = t.deadline;
      if (!deadline) {return false;}

      if (from && deadline < from) { return false; }
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        if (deadline > end) { return false; }
      }
    }

    return true;
  });
}
