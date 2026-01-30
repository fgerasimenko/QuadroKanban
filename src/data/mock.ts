import { Task } from "@/types/taskTypes";

export const mockTasks: Task[] = [
    {
        id: "1",
        order: 1,
        title: "Criar estrutura de pastas",
        longDescription: "Criar estrutura de pastas do projeto Kanban",
        location: "Projeto",
        isExternal: false,
        priority: 'HIGH',
        status: 'TODO',
        deadline: new Date("2026-01-30"),
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
        archivedAt: undefined,
        assignedTo: {
            id: "1",
            name: "Usuário"
        },
        archived: false
    },
    {
        id: "2",
        order: 2,
        title: "Criar Hooks",
        longDescription: "Criar Hooks do board kanban",
        location: "Projeto",
        isExternal: false,
        priority: 'CRITICAL',
        status: 'DOING',
        deadline: new Date("2026-02-01"),
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
        archivedAt: undefined,
        assignedTo: {
            id: "1",
            name: "Usuário"
        },
        archived: false
    },
    {
        id: "3",
        order: 3,
        title: "Criar Utils",
        longDescription: "Criar pasta e arquivos utils",
        location: "Projeto",
        isExternal: false,
        priority: 'LOW',
        status: 'TODO',
        deadline: new Date("2026-03-04"),
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
        archivedAt: undefined,
        assignedTo: {
            id: "1",
            name: "Usuário"
        },
        archived: false
    }
]
