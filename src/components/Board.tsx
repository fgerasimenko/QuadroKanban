import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Task } from "../types/taskTypes";
import { BoardColumn } from "./BoardColumn";
import { statusToText } from "@/utils/textUtils";

type Columns = {
  TODO: Task[];
  DOING: Task[];
  DONE: Task[];
};

type Props = {
  columns: Columns;
  onCardClick: (taskId: string) => void;
  onCardMove?: (taskId: string, nextStatus: Task["status"]) => void;
  onDragEnd: (result: DropResult) => void;
};

export function Board({ columns, onCardClick, onCardMove, onDragEnd }: Props) {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                <BoardColumn
                    title={statusToText("TODO")}
                    status="TODO"
                    tasks={columns.TODO}
                    onCardClick={onCardClick}
                    onCardMove={onCardMove}
                />
                <BoardColumn
                    title={statusToText("DOING")}
                    status="DOING"
                    tasks={columns.DOING}
                    onCardClick={onCardClick}
                    onCardMove={onCardMove}
                />
                <BoardColumn
                    title={statusToText("DONE")}
                    status="DONE"
                    tasks={columns.DONE}
                    onCardClick={onCardClick}
                    onCardMove={onCardMove}
                />
            </div>
        </DragDropContext>
    );
}
