import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todosAtom } from "./atom";
import Board2 from "./components/Board2"
import Mkform from './components/Mkform'
import Delete from "./components/Delete"; 

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
function App() {
  const [toDos, setToDos] = useRecoilState(todosAtom);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId && destination.droppableId !== 'trash') {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    if (source.droppableId !== destination.droppableId && destination.droppableId === 'trash') {
        setToDos((oldtodos) => {
            const targetForm = [...oldtodos[source.droppableId]]
            targetForm.splice(source.index, 1)
            return { ...oldtodos, [source.droppableId]: targetForm }
        })
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Mkform />
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board2 boardId={boardId} key={boardId} todos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
      <Delete />
    </DragDropContext>
  );
}
export default App;