import type { TaskPriority, TaskStatus } from "@/types/taskTypes";
import type { TaskFilters } from "@/domain/taskFilters";

type Props = {
  filters: TaskFilters;
  onChange: (patch: Partial<TaskFilters>) => void;
};

const priorities: Array<TaskPriority | "ALL"> = ["ALL", "LOW", "HIGH", "CRITICAL"];
const statuses: Array<TaskStatus | "ALL"> = ["ALL", "TODO", "DOING", "DONE"];

export function FiltersInput({filters, onChange}: Props) {
    return (
        <div className="filters">
            <div className="field">
                <label>Busca</label>
                <input 
                    value={filters.query}
                    placeholder="Buscar por nome, descrição, localidade"
                    onChange={(e) => onChange({ query: e.target.value })}
                >
                </input>
            </div>
            <div className="field">
                <label>Prioridade</label>
                <select
                    value={filters.priority}
                    onChange={(e) => onChange({ priority: e.target.value as any })}
                >
                {priorities.map((p) => (
                    <option key={p} value={p}>
                    {p === "ALL" ? "Todas" : p === "LOW" ? "Baixa" : p === "HIGH" ? "Alta" : "Crítica"}
                    </option>
                ))}
                </select>
            </div>
            <div className="field">
                <label>Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => onChange({ status: e.target.value as any })}
                >
                {statuses.map((s) => (
                    <option key={s} value={s}>
                    {s === "ALL" ? "Todos" : s === "TODO" ? "A fazer" : s === "DOING" ? "Em andamento" : "Concluído"}
                    </option>
                ))}
                </select>
            </div>
            <div className="field">
                <label>De</label>
                <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onChange({ dateFrom: e.target.value })}
                />
            </div>

            <div className="field">
                <label>Até</label>
                <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => onChange({ dateTo: e.target.value })}
                />
            </div>
            <button 
                className="btn" 
                onClick={() => onChange({ query: "", priority: "ALL", location: "ALL", status: "ALL", dateFrom: "", dateTo: "" })}
            >
                Limpar
            </button>
        </div>
    )
}