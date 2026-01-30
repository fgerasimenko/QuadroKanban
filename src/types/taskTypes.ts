export type TaskPriority = "LOW" | "HIGH" | "CRITICAL";
export type TaskStatus = "TODO" | "DOING" | "DONE";

export type Task = {
    id: string;
    order: number;
    title: string;
    priority: TaskPriority;
    shortDescription?: string;
    longDescription: string;
    status: TaskStatus
    assignedTo?: Assigned;
    
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    archivedAt?: Date;
}

export type Assigned = {
    id: string;
    name: string;
}

