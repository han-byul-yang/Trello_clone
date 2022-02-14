import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todosAtom } from './atom';
import DraggableCards from './components/DraggableCards';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;


function App() {
  const [toDos, setToDos] = useRecoilState(todosAtom) //state인 toDos가 바뀔 때마다 react가 rerendering 이 됨(useState의 state뿐만 아니라) 모든 state 해당,, 하지만 정말 값 하나를 옮기는 데 모든 게 다 리렌더링됨,, 이게 불필요할 때도 있음(버벅거리기도 하고),, 
  //부모의 부모가 state가 바뀌면 자식(children)도 다 바뀌기 때문에 불필요한 리렌더링이 계속 일어날 확률이 높음() 이 때 필요한 것이 useMemo(props가 변하지 않는다면 리렌더링 하지 말라)
  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if (!destination) {return}
    setToDos((oldtodos) => {
    /*기본 데이터를 변경하는 건 react의 방식이 아니기 때문에 원본을 유지하기 위해 복사 copy를 해줌*/
      const newTodos = [...oldtodos] 
      newTodos.splice(source.index,1)
      newTodos.splice(destination?.index, 0, draggableId)
      return newTodos
    })
  } /*onDragEnd 함수는 onDragEnd로 부터 인자를 받음(드래그 앤 드롭 정보)*/ /* Draggable key와 draggableId는 값이 같아야 함 */

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper className="App">
        <Boards>
          <Droppable droppableId='drop'>
            {(magic) => (<Board ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((todo, idx) => <DraggableCards todo={todo} idx={idx}/>)}
              {magic.placeholder} {/* 위치 고정 placeholder */}
            </Board>)}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
