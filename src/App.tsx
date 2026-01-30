import { mockTasks } from "./data/mock";
import { Board } from "./components/Board";
import { FiltersInput } from "./components/FiltersInput";
import { TaskModal } from "./components/TaskModal";
import { useBoard } from "./hooks/useBoard";
import { BoardProvider } from "./store/boardStore";

type CurrentUser = {
  id: string;
  name: string;
};

function AppContent({ currentUser }: { currentUser: CurrentUser }) {
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

      <div>
        
      </div>

      <FiltersInput filters={filters} onChange={patchFilters} />
      <Board
        columns={columns}
        onCardClick={openCard}
        onCardMove={moveCard}
        onDragEnd={onDragEnd}
      />

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
}

export default function App() {
  const currentUser = { id: "1", name: "Fabio" };

  return (
    <BoardProvider initialTasks={mockTasks} currentUser={currentUser}>
      <AppContent currentUser={currentUser} />
    </BoardProvider>
  );
}
