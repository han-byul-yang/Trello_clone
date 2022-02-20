import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

const Wrapper = styled.div``

const Trash = styled.div<Drag>`
color: ${(props) => props.isDraggingOver ? 'red' : 'white'} ;
position: relative;
text-align: end;
width: 5rem;
margin: 0 auto;
right: 2rem;
bottom: 2rem;
`
const Puttrash = styled.div``

interface Drag {
    isDraggingOver : boolean,
}

function Delete() {
    return (
        <Wrapper>
            <Droppable droppableId="trash" >{
                (magic, info) => (
                    <Trash isDraggingOver={info.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ width: '3rem', height: '3rem' }} />
                        {magic.placeholder}
                    </Trash>)}
            </Droppable>
        </Wrapper>
    )
}

export default Delete