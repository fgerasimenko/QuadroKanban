import { useEffect, useMemo, useState } from "react";
import type { Task, TaskPriority } from "@/types/taskTypes";
import { toDate, toInputDate } from "@/utils/dateUtils";
import { ActionButton } from "@/components/ActionButton";
import { useBoard } from "@/hooks/useBoard";

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  task?: Task | null;
  onClose: () => void;
};

const priorities: TaskPriority[] = ["LOW", "HIGH", "CRITICAL"];

export function TaskFormModal({ mode, task, onClose }: Props) {
  const { createTask, updateTask, archiveTask, unarchiveTask } = useBoard();
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [isExternal, setIsExternal] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("LOW");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && task) {
      setTitle(task.title);
      setLocation(task.location);
      setIsExternal(task.isExternal);
      setShortDescription(task.shortDescription ?? "");
      setLongDescription(task.longDescription);
      setPriority(task.priority);
      setDeadline(toInputDate(task.deadline));
    } else {
      setTitle("");
      setShortDescription("");
      setLocation("");
      setIsExternal(false);
      setLongDescription("");
      setPriority("LOW");
      setDeadline("");
    }
    setError(null);
  }, [isEdit, task]);

  const modalTitle = useMemo(() => {
    return isEdit ? "Editar tarefa" : "Criar tarefa";
  }, [isEdit]);

  const handleSave = () => {
    const newTitle = title.trim();
    const newLong = longDescription.trim();
    const newDeadline = toDate(deadline);

    if (!newTitle) {
      setError("Preencha o título.");
      return;
    }

    if (!newDeadline) {
      setError("Data limite inválida.");
      return;
    }

    const patch = {
      title: newTitle,
      location: location.trim() || undefined,
      isExternal,
      shortDescription: shortDescription.trim() || undefined,
      longDescription: newLong || "",
      priority,
      deadline: newDeadline,
    };

    if (isEdit && task) {
      updateTask(task.id, patch);
    } else {
      createTask(patch);
    }

    onClose();
  };

  const handleArchive = () => {
    if (!task) return;
    if (task.archived) {
      unarchiveTask(task.id);
    } else {
      archiveTask(task.id);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{modalTitle}</div>
          <button className="btn" onClick={onClose} aria-label="Fechar modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Titulo</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titulo da tarefa"
            />
          </div>
          <div className="field">
            <label>Local</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Local da tarefa"
            />
            <div className="checkbox">
              <input
                checked={isExternal}
                id="isExternal"
                type="checkbox"
                onChange={(e) => setIsExternal(e.target.checked)}
              />
              <label htmlFor="isExternal">Externo</label>
            </div>
          </div>
          <div className="field">
            <label>Descricao curta</label>
            <input
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Resumo opcional"
            />
          </div>
          <div className="field">
            <label>Descricao</label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Descreva a tarefa"
            />
          </div>
          <div className="field">
            <label>Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p === "LOW" ? "Baixa" : p === "HIGH" ? "Alta" : "Critica"}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Data limite</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          {error ? <div className="form-error">{error}</div> : null}
        </div>
        <div className="modal-footer modal-actions">
          {isEdit && task ? (
            <ActionButton
              title={task.archived ? "Desarquivar" : "Arquivar"}
              icon={task.archived ? "fa-box-open" : "fa-box-archive"}
              variant="secondary"
              onAction={handleArchive}
            />
          ) : null}
          <ActionButton title="Cancelar" variant="danger" onAction={onClose} />
          <ActionButton
            title={isEdit ? "Salvar" : "Criar"}
            icon={isEdit ? "fa-floppy-disk" : "fa-plus"}
            variant="primary"
            onAction={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
