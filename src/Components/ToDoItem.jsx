import React, { useState } from "react";

function ToDoItem({ task, toggleTask, deleteTask, editTask }) {
  const [editedValue, setEditedValue] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);

  function handleOnClickEditButton() {
    if (isEditing === true && editedValue.trim() !== "") {
      editTask(task.id, editedValue);
    }

    setIsEditing(!isEditing);
  }

  function handleOnChangeInputText(event) {
    setEditedValue(event.target.value);
  }

  return (
    // we are taking li here as in the ToDoList component we are taking <ul> , and each item will be <li>
      <li>
        {isEditing === true ? (
          <input 
          type="text"
          value={editedValue}
          onChange={handleOnChangeInputText}
          />
        ) : (
          <span onClick={()=>toggleTask(task.id)}>
            {task.name}
          </span>
        )}
        <button onClick={handleOnClickEditButton}>{isEditing === true ? "Save" : "Edit"}</button>
        <button onClick={()=>deleteTask(task.id)}>Delete</button>
      </li>
  );
}

export default ToDoItem;
