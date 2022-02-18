import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useMemo } from 'react';
import React from 'react';
import { Todo } from '../atom';

const Card = styled.div<Drag>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? 'gray' : 'white'};
`;

interface Cards {
    todo: Todo,
    idx: number,
}
interface Drag {
    isDragging : boolean,
}

function DraggableCards({todo, idx}: Cards) {
    return (<Draggable draggableId={todo.id+''} index={idx}>
        {(magic, info) => <Card isDragging={info.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>{todo.todo}</Card>}
    </Draggable>)
}

export default React.memo(DraggableCards)