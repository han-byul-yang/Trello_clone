import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todosAtom } from '../atom';
import Board from './Board';
import { Todoform } from '../atom';
import { useForm } from 'react-hook-form'
import Mkform from './Mkform';
import Delete from './Delete';

const Wrapper = styled.div`
  display: flex;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const MoveBoards = styled.div``

const Dropboards = styled.div``

interface Form {
    mkform: string,
}

function BoardContainer() {
    const [toDoList, setToDoList] = useRecoilState(todosAtom) //state인 toDos가 바뀔 때마다 react가 rerendering 이 됨(useState의 state뿐만 아니라) 모든 state 해당,, 하지만 정말 값 하나를 옮기는 데 모든 게 다 리렌더링됨,, 이게 불필요할 때도 있음(버벅거리기도 하고),, 
    //부모의 부모가 state가 바뀌면 자식(children)도 다 바뀌기 때문에 불필요한 리렌더링이 계속 일어날 확률이 높음() 이 때 필요한 것이 useMemo(props가 변하지 않는다면 리렌더링 하지 말라)
    const { register, handleSubmit, setValue } = useForm<Form>()

    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) { return }
        /*기본 데이터를 변경하는 건 react의 방식이 아니기 때문에 원본을 유지하기 위해 복사 copy를 해줌*/
        if (source.droppableId !== destination.droppableId && destination.droppableId !== 'trash') {
            setToDoList((oldtodos) => {                                 //setToDoList 내부에 if를 써줄 수는 없음(오류 생김)
                const sourceTodos = [...oldtodos[source.droppableId]]
                const obTodos = { ...sourceTodos[source.index] }
                const destinationTodos = [...oldtodos[destination.droppableId]]
                sourceTodos.splice(source.index, 1)
                destinationTodos.splice(destination?.index, 0, obTodos)
                return { ...oldtodos, [source.droppableId]: sourceTodos, [destination.droppableId]: destinationTodos }
            })
        }
        if (source.droppableId === destination?.droppableId) {
            setToDoList((oldtodos) => {
                const newTodos = [...oldtodos[source.droppableId]]
                const obTodos = { ...newTodos[source.index] }
                newTodos.splice(source.index, 1)
                newTodos.splice(destination?.index, 0, obTodos)
                return { ...oldtodos, [source.droppableId]: newTodos }
            })
        }
        if (source.droppableId !== destination.droppableId && destination.droppableId === 'trash') {
            setToDoList((oldtodos) => {
                const targetForm = [...oldtodos[source.droppableId]]
                targetForm.splice(source.index, 1)
                return { ...oldtodos, [source.droppableId]: targetForm }
            })
        }
    } /*onDragEnd 함수는 onDragEnd로 부터 인자를 받음(드래그 앤 드롭 정보)*/ /* Draggable key와 draggableId는 값이 같아야 함 */

    return (
        <>
            <Mkform />
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper className="App">
                    <Boards>
                        <Droppable droppableId='dropboard'>
                            {(magic, info) => <Dropboards ref={magic.innerRef} {...magic.droppableProps}>
                                {Object.keys(toDoList).map((keyy, idx) =>
                                    <Board key={idx} boardId={keyy} toDos={toDoList[keyy]} />)}
                            </Dropboards>}
                        </Droppable>
                    </Boards>
                </Wrapper>
                <Delete />
            </DragDropContext>
        </>
    );
}

export default BoardContainer;
