import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useMemo } from 'react';
import React from 'react';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface Cards {
    todo: string,
    idx: number,
}

function DraggableCards({todo, idx}: Cards) {
    return (<Draggable key={todo} draggableId={todo} index={idx}>
        {(magic) => <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>{todo}</Card>}
    </Draggable>)
}

export default React.memo(DraggableCards)