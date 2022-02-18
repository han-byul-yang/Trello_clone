import { Droppable } from 'react-beautiful-dnd'
import DraggableCards from './DraggableCards';
import styled from 'styled-components';
import { Todo, todosAtom } from '../atom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

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

interface Boardform {
    todos : Todo[],
    boardId : string,
}

interface Dragging {
    isDraggingOver : boolean,
    draggingFromThisWith : boolean,
}

interface Form {
    intodo : string,
}
/* //현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인
isDraggingOver: boolean,

Droppable 위로 드래그하는 Draggable ID
draggingOverWith: ?DraggableId,

현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID
draggingFromThisWith: ?DraggableId,

placeholder가 사용되고 있는지 여부
isUsingPlaceholder: boolean, */


function Board({todos, boardId}: Boardform) {
  const { register, setValue, handleSubmit } = useForm<Form>()
  const [putToDo, setPutToDo] = useRecoilState(todosAtom)

  const onValid = ({intodo}: Form) => {
    setPutToDo((oldtodos)=> {return{...oldtodos, [boardId] : [...oldtodos[boardId], {id: Date.now(), todo: intodo}]}})
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
            {magic.placeholder} {/* 위치 고정 placeholder */}
        </Area>)}
    </Droppable>
    </Wrapper>
}

export default Board