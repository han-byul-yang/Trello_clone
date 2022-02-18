import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

const Wrapper = styled.div``

const Trash = styled.div`
color: white;
position: relative;
text-align: end;
width: 5rem;
margin: 0 auto;
right: 2rem;
bottom: 2rem;
`

function Delete () {
    return (
            <Wrapper>
                <Droppable droppableId="trash" >{
                    (magic) => (<Trash ref={magic.innerRef} {...magic.droppableProps}>
        <FontAwesomeIcon icon={faTrashCan} style={{width: '3rem', height:'3rem'}} />
        {magic.placeholder}
        </Trash>)}
        </Droppable>
        </Wrapper>
    )
}

export default Delete