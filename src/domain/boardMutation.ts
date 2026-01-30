import { sortByOrder } from "@/domain/boardSelectors";
import { Task } from "@/types/taskTypes";


export const moveCardToStatus = (
    tasks: Task[],
    taskId: string,
    nextStatus: Task["status"],
    userId: string
): Task[] => {
    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.archived || task.assignedTo?.id !== userId) { return tasks; }

    const destTasks = tasks.filter(
        (t) => t.status === nextStatus && !t.archived && t.id !== taskId
    ).sort(sortByOrder)

    const nextOrder = destTasks.length ? destTasks[destTasks.length -1].order + 1 : 0

    return tasks.map(
        (t) => t.id === taskId ? { ...t, status: nextStatus, order: nextOrder} : t
    )
};