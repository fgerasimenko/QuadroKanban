export type TaskPriority = "LOW" | "HIGH" | "CRITICAL";
export type TaskStatus = "TODO" | "DOING" | "DONE";


export type Task = {
    id: string;
    order: number;
    title: string;
    location?: string;
    isExternal: boolean; 
    priority: TaskPriority;
    shortDescription?: string;
    longDescription?: string;
    status: TaskStatus
    assignedTo?: Assigned;
    archived: boolean;

    
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    archivedAt?: Date;
}

export type Assigned = {
    id: string;
    name: string;
}

