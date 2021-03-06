import React from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {arrayReorder} from "../utils/ArrayProcessing";

const DragDropList = ({cardList, setCardList}) => {
    const onEnd = (result) => {
        console.log(result)
        if (result.destination !== null && result.source !== null) {
            setCardList(arrayReorder(cardList, result.source.index, result.destination.index))
        }
    }
    return (
        <DragDropContext onDragEnd={onEnd}>
            <Droppable droppableId='droppableTag'>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        {cardList.map((item, index) => (
                            <Draggable
                                draggableId={item.code}
                                key={item.code}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <div className="drag-item">{item.name}</div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )
                }
            </Droppable>
        </DragDropContext>
    );
};

export default DragDropList;