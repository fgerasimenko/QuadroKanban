import { useMemo } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task } from "../types/taskTypes";
import { filterTasks } from "../domain/taskFilters";
import { useBoardStore } from "../store/boardStore";

export function useBoard() {
    const {
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
        toggleShowArchived,
        createTask,
        updateTask,
        archiveTask,
        unarchiveTask,
    } = useBoardStore();

    const tasksForUser = useMemo(() => {
        return tasks.filter((t: Task) => t.assignedTo?.id === currentUser.id);
    }, [tasks, currentUser.id]);

    const activeTasks = useMemo(() => {
        return tasksForUser.filter((t) => !t.archived);
    }, [tasksForUser]);

    const archivedTasks = useMemo(() => {
        return tasksForUser.filter((t) => t.archived);
    }, [tasksForUser]);

    const visibleTasks = useMemo(() => {
        return filterTasks(activeTasks, filters);
    }, [activeTasks, filters]);

    const visibleArchivedTasks = useMemo(() => {
        return filterTasks(archivedTasks, filters);
    }, [archivedTasks, filters]);

    const sortByOrder = (a: Task, b: Task) => a.order - b.order;

    const columns = useMemo(() => ({
        TODO: visibleTasks.filter(t => t.status === "TODO").sort(sortByOrder),
        DOING: visibleTasks.filter(t => t.status === "DOING").sort(sortByOrder),
        DONE: visibleTasks.filter(t => t.status === "DONE").sort(sortByOrder),
    }), [visibleTasks]);

    const selectedTask = useMemo(() => {
        if (!selectedTaskId) { return null; }
        return tasksForUser.find((t) => t.id === selectedTaskId) ?? null;
    }, [selectedTaskId, tasksForUser]);

    function openCard(taskId: string) {
        setSelectedTaskId(taskId);
    }


    function closeModal() {
        setSelectedTaskId(null);
    }

    function moveCard(taskId: string, nextStatus: Task["status"]) {
        setTasks((prev) => {
            const task = prev.find((t) => t.id === taskId);
            if (!task || task.archived || task.assignedTo?.id !== currentUser.id) { return prev; }

            const destTasks = prev
                .filter((t) => t.status === nextStatus && !t.archived && t.id !== taskId)
                .sort(sortByOrder);

            const nextOrder = destTasks.length
                ? destTasks[destTasks.length - 1].order + 1
                : 0;

            return prev.map((t) =>
                t.id === taskId ? { ...t, status: nextStatus, order: nextOrder } : t
            );
        });
    }

    function onDragEnd(result: DropResult) {
        const { source, destination, draggableId } = result;
        if (!destination) { return; }

        const sourceId = source.droppableId as Task["status"];
        const destId = destination.droppableId as Task["status"];

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const arrayMove = <T,>(list: T[], from: number, to: number) => {
            const next = [...list];
            const [item] = next.splice(from, 1);
            next.splice(to, 0, item);
            return next;
        };

        const replaceVisibleSlots = (
            full: Task[],
            visibleSet: Set<string>,
            nextVisible: Task[]
        ) => {
            let idx = 0;
            return full.map((t) => (visibleSet.has(t.id) ? nextVisible[idx++] : t));
        };

        setTasks((prev) => {
            const tasksForUser = prev.filter((t) => t.assignedTo?.id === currentUser.id);
            const activeTasks = tasksForUser.filter((t) => !t.archived);
            const visible = filterTasks(activeTasks, filters);
            const visibleIds = new Set(visible.map((t) => t.id));

            const getColumnFull = (status: Task["status"]) =>
                activeTasks.filter((t) => t.status === status).sort(sortByOrder);

            const updates = new Map<string, Task>();

            if (sourceId === destId) {
                const full = getColumnFull(sourceId);
                const visibleList = full.filter((t) => visibleIds.has(t.id));
                const reorderedVisible = arrayMove(
                    visibleList,
                    source.index,
                    destination.index
                );
                const nextFull = replaceVisibleSlots(full, visibleIds, reorderedVisible);
                nextFull.forEach((t, i) => updates.set(t.id, { ...t, order: i }));
            } else {
                const sourceFull = getColumnFull(sourceId);
                const destFull = getColumnFull(destId);
                const moved = sourceFull.find((t) => t.id === draggableId);
                if (!moved) { return prev; }

                const nextSourceFull = sourceFull.filter((t) => t.id !== draggableId);
                nextSourceFull.forEach((t, i) => updates.set(t.id, { ...t, order: i }));

                const destVisible = destFull.filter((t) => visibleIds.has(t.id));
                const beforeId = destVisible[destination.index]?.id;
                let insertIndex = destFull.length;

                if (beforeId) {
                    insertIndex = destFull.findIndex((t) => t.id === beforeId);
                } else if (destVisible.length > 0) {
                    const lastVisibleId = destVisible[destVisible.length - 1].id;
                    const lastIndex = destFull.findIndex((t) => t.id === lastVisibleId);
                    insertIndex = lastIndex + 1;
                }

                const nextDestFull = [...destFull];
                const movedUpdated = { ...moved, status: destId };
                nextDestFull.splice(insertIndex, 0, movedUpdated);
                nextDestFull.forEach((t, i) => updates.set(t.id, { ...t, order: i }));
            }

            if (updates.size === 0) { return prev; }

            return prev.map((t) => updates.get(t.id) ?? t);
        });
    }



    return {
        filters,
        patchFilters,
        columns,
        selectedTask,
        archivedTasks: visibleArchivedTasks,
        showArchived,
        toggleShowArchived,
        editingTaskId,
        setEditingTaskId,
        createTask,
        updateTask,
        archiveTask,
        unarchiveTask,
        openCard,
        closeModal,
        moveCard,
        onDragEnd
    };
}
