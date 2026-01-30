import type { Task } from "@/types/taskTypes";
import { dateToString } from "@/utils/dateUtils";
import { statusToText } from "@/utils/textUtils";
import { ActionButton } from "@/components/ActionButton";
import { useBoard } from "@/hooks/useBoard";

type Props = {
    task: Task;
    onClose: () => void;

};

export function TaskModal({task, onClose}: Props) {
    const {
        archiveTask
      } = useBoard();
    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                <div className="modal-title">{task.title}</div>
                <div className="modal-subtitle">
                    <span><strong>Data:</strong> {dateToString(task.deadline)}</span>
                    <span><strong>Prioridade:</strong> {task.priority}</span>
                    <span><strong>Status:</strong> {statusToText(task.status)}</span>
                </div>
                <button className="btn" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                </div>
                <div className="modal-body">
                    <h4>Descrição</h4>
                    <p className="desc">{task.longDescription}</p>
                </div>
                <div className="modal-footer">
                    <ActionButton
                        title="Editar"
                        icon="fa-pencil"
                        variant="primary"
                        onAction={() => alert("Excluído!")}
                        />
                    <ActionButton
                        title="Arquivar"
                        icon="fa-box-archive"
                        variant="danger"
                        onAction={() => archiveTask(task.id)}
                        />
                </div>
            </div>
        </div>
    )
}