import { dateToString, toDate } from "@/utils/dateUtils";
import { Task } from "../types/taskTypes";

type Props = {
    task: Task
    onClick: () => void;
    onMove?: (next: Task["status"]) => void;
}

function priorityLabel(p: Task["priority"]) {
  if (p === "LOW") return "Baixa";
  if (p === "HIGH") return "Alta";
  return "Crítica";
}

export function TaskCard({ task, onClick, onMove }: Props) {
    return (
        <div className={`card priority-${task.priority.toLowerCase()}`} onClick={onClick} role="button">
            <div className="card-title">{task.title}</div>

            <div className="card-meta">
                <div><strong>Data:</strong> {dateToString(task.createdAt)}</div>
                <div><strong>Data Final:</strong> {dateToString(task.deadline)}</div>
                <div><strong>Prioridade:</strong> {priorityLabel(task.priority)}</div>
            </div>

            {onMove && (
                <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                {task.status !== "TODO" && (
                    // <i className="fa-solid fa-chevron-left" onClick={() => onMove("TODO")}></i>
                    <button className="btn" onClick={() => onMove("TODO")}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                )}
                {task.status !== "DONE" && (
                    <button
                        className="btn"
                        onClick={() => onMove(task.status === "TODO" ? "DOING" : "DONE")}
                    >
                    <i className="fa-solid fa-chevron-right"></i>
                    </button>
                )}
                </div>
            )}
        </div>        
    )

}
