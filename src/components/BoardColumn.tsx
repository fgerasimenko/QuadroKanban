import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Task } from "../types/taskTypes";
import { TaskCard } from "./TaskCard";

type Props = {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onCardClick: (taskId: string) => void;
  onCardMove?: (taskId: string, nextStatus: Task["status"]) => void;
};

export function BoardColumn({ title, status, tasks, onCardClick, onCardMove }: Props) {
  return (
    <div className="col">
      <div className="col-header">
        <h3>{title}</h3>
        <span className="col-task-count">{tasks.length}</span>
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="col-body"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        onClick={() => onCardClick(task.id)}
                        onMove={
                          onCardMove
                            ? (next) => onCardMove(task.id, next)
                            : undefined
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div>Sem tarefas</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
