import { useState } from "react";
import { mockTasks } from "./data/mock";
import { Board } from "./components/Board";
import { FiltersInput } from "./components/FiltersInput";
import { TaskFormModal } from "./components/TaskFormModal";
import { useBoard } from "./hooks/useBoard";
import { BoardProvider } from "./store/boardStore";
import { ActionButton } from "./components/ActionButton";

type CurrentUser = {
  id: string;
  name: string;
};

function AppContent({ currentUser }: { currentUser: CurrentUser }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const {
    filters,
    patchFilters,
    columns,
    selectedTask,
    closeModal,
    openCard,
    moveCard,
    onDragEnd,
  } = useBoard();

  return (
    <div>
      <header>
        <div>
          <h1>Quadro de Tarefas</h1>
        </div>
      </header>

      <FiltersInput filters={filters} onChange={patchFilters} />

      <div className="board-actions">
        <ActionButton title="Criar Tarefa" onAction={() => setIsCreateOpen(true)} />
      </div>

      <Board
        columns={columns}
        onCardClick={openCard}
        onCardMove={moveCard}
        onDragEnd={onDragEnd}
      />

      {isCreateOpen ? (
        <TaskFormModal mode="create" onClose={() => setIsCreateOpen(false)} />
      ) : null}

      {selectedTask ? (
        <TaskFormModal mode="edit" task={selectedTask} onClose={closeModal} />
      ) : null}
    </div>
  );
}

export default function App() {
  const currentUser = { id: "1", name: "Usuário" };

  return (
    <BoardProvider initialTasks={mockTasks} currentUser={currentUser}>
      <AppContent currentUser={currentUser} />
    </BoardProvider>
  );
}
