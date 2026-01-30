import { useMemo } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task } from "../types/taskTypes";
import {
    selectActiveTasks,
    selectArchivedTasks,
    selectColumns,
    selectSelectedTask,
    selectTasksForUser,
    selectVisibleTasks,
    sortByOrder,
} from "../domain/boardSelectors";
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
        moveTask,
    } = useBoardStore();

    const tasksForUser = useMemo(() => {
        return selectTasksForUser(tasks, currentUser.id);
    }, [tasks, currentUser.id]);

    const activeTasks = useMemo(() => {
        return selectActiveTasks(tasksForUser);
    }, [tasksForUser]);

    const archivedTasks = useMemo(() => {
        return selectArchivedTasks(tasksForUser);
    }, [tasksForUser]);

    const visibleTasks = useMemo(() => {
        return selectVisibleTasks(activeTasks, filters);
    }, [activeTasks, filters]);

    const visibleArchivedTasks = useMemo(() => {
        return selectVisibleTasks(archivedTasks, filters);
    }, [archivedTasks, filters]);

    const columns = useMemo(() => selectColumns(visibleTasks), [visibleTasks]);

    const selectedTask = useMemo(() => {
        return selectSelectedTask(tasksForUser, selectedTaskId);
    }, [selectedTaskId, tasksForUser]);

    function openCard(taskId: string) {
        setSelectedTaskId(taskId);
    }


    function closeModal() {
        setSelectedTaskId(null);
    }

    function moveCard(taskId: string, nextStatus: Task["status"]) {
        moveTask(taskId, nextStatus);
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
            const tasksForUser = selectTasksForUser(prev, currentUser.id);
            const activeTasks = selectActiveTasks(tasksForUser);
            const visible = selectVisibleTasks(activeTasks, filters);
            const visibleIds = new Set(visible.map((t) => t.id));

            const getColumnFull = (status: Task["status"]) =>
                activeTasks.filter((t) => t.status === status).sort(sortByOrder);

            const updates = new Map<string, Task>();

            if (sourceId === destId) {
                const full = getColumnFull(sourceId);
                const visibleList = full.filter((t) => visibleIds.has(t.id));
                const reorderedVisible = arrayMove<Task>(
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
