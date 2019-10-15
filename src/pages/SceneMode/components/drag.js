import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Input } from "antd";
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  // margin: `0 0 ${2}px 0`,
  height: "3rem",
  background: isDragging ? "rgba(56,150,222,0.6)" : "rgba(0,160,233,0.75)",
  borderBottom: "2px solid #3896de",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ...draggableStyle
  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
});
const Drag = ({
  onDragStart,
  onDragEnd,
  onDragUpdate,
  items,
  itemData,
  mark,
  DeleteArray
}) => {
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      <Droppable ignoreContainerClipping={true} droppableId="droppable">
        {(provided, snapshot) => (
          <div className="Scene-body-left-list-centent" ref={provided.innerRef}>
            {/* {console.log(this.state.items)} */}
            {items.map((item, index) => {
              return (
                <Draggable
                  key={index}
                  draggableId={item.order_no.toString()} //order_no作为ID
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      onClick={itemData.bind(this, item, index)}
                      className={
                        mark === index
                          ? "aaaaaaaa"
                          : "Scene-body-list-centent-item"
                      }
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <span>{item.equip_key_name}</span>
                      <Input
                        size="small"
                        addonBefore="延迟"
                        addonAfter="秒"
                        value={item.time_consuming}
                        className="input"
                        onChange={e => {
                          DeleteArray(e, index);
                        }}
                        // onChange={this.DeleteArray.bind(this,)}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Drag;
