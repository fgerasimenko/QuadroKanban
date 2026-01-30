import { filterTasks } from "@/domain/taskFilters";
import { Task } from "@/types/taskTypes";

export const selectTasksForUser = (tasks, userId) =>
  tasks.filter(t => t.assignedTo?.id === userId);

export const selectActiveTasks = (tasksForUser) =>
  tasksForUser.filter(t => !t.archived);

export const selectArchivedTasks = (tasksForUser) =>
  tasksForUser.filter(t => t.archived);

export const selectVisibleTasks = (activeTasks, filters) =>
  filterTasks(activeTasks, filters);

export const sortByOrder = (a: Task, b: Task) => a.order - b.order;

export const selectColumns = (visibleTasks) => {
  return {
    TODO: visibleTasks.filter(t => t.status === "TODO").sort(sortByOrder),
    DOING: visibleTasks.filter(t => t.status === "DOING").sort(sortByOrder),
    DONE: visibleTasks.filter(t => t.status === "DONE").sort(sortByOrder),
  };
};

export const selectSelectedTask = (tasksForUser, selectedTaskId) =>
  selectedTaskId ? tasksForUser.find(t => t.id === selectedTaskId) ?? null : null;