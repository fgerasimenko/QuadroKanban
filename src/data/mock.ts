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
    },
    {
        id: "4",
        order: 4,
        title: "Título grande pra cacete que faz não caber o pill na mesma linha que o proprio titulo",
        longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        location: "Projeto",
        isExternal: false,
        priority: 'CRITICAL',
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
