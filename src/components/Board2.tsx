import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import DraggableCards from './DraggableCards';
import styled from 'styled-components';
import { Todo, todosAtom } from '../atom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

const Wraps = styled.div``

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
text-align: center;`

const Area = styled.div<Dragging>`
background: ${(props) => props.isDraggingOver ? 'purple' : props.draggingFromThisWith ? 'green' : 'pink'};
flex-grow: 1;
padding: 20px;`

const Intodos = styled.input`
`

const Form = styled.form`
width: 100%;
input{width: 100%}`

const Oneform = styled.div`
display: flex;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Forms = styled.div`
 display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;`

interface Boardform {
    todos: Todo[],
    boardId: string,
}

interface Dragging {
    isDraggingOver: boolean,
    draggingFromThisWith: boolean,
}

interface Form {
    intodo: string,
}
//현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인
/*isDraggingOver: boolean,

Droppable 위로 드래그하는 Draggable ID
draggingOverWith: ?DraggableId,

현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID
draggingFromThisWith: ?DraggableId,

placeholder가 사용되고 있는지 여부
isUsingPlaceholder: boolean, */


function Board2({ todos, boardId }: Boardform) {
    const [toDoList, setToDoList] = useRecoilState(todosAtom)
    const { register, setValue, handleSubmit } = useForm<Form>()
    const [putToDo, setPutToDo] = useRecoilState(todosAtom)

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
    } //onDragEnd 함수는 onDragEnd로 부터 인자를 받음(드래그 앤 드롭 정보)  Draggable key와 draggableId는 값이 같아야 함 

    const onValid = ({ intodo }: Form) => {
        setPutToDo((oldtodos) => { return { ...oldtodos, [boardId]: [...oldtodos[boardId], { id: Date.now(), todo: intodo }] } })
        setValue("intodo", '')
    }

    return <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
            <Intodos type="text" placeholder='일정 추가' {...register('intodo')}></Intodos>
        </Form>
        <Droppable key={boardId} droppableId={boardId}>
            {(magic, info) => (<Area isDraggingOver={info.isDraggingOver} draggingFromThisWith={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
                {todos.map((todo, idx) => <DraggableCards key={todo.id} todo={todo} idx={idx} />)}
                {magic.placeholder} {/*위치 고정 placeholder*/}
            </Area>)}
        </Droppable>
    </Wrapper>

}

export default Board2