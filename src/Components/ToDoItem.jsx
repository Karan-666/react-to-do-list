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
      <li className="flex justify-between items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-200">
        {isEditing === true ? (
          <input 
          type="text"
          value={editedValue}
          onChange={handleOnChangeInputText}
          className="flex-1 p-1 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        ) : (
          <span className={`flex-1 text-white cursor-pointer ${task.isComplete ? "line-through text-gray-500" : ""}`} onClick={()=>toggleTask(task.id)}>
            {task.name}
          </span>
        )}
        <div className="flex gap-2 ml-4">
        <button onClick={handleOnClickEditButton} className="bg-teal-500 text-white text-xs py-1 px-2 rounded-md hover:bg-teal-400 transition duration-300"> 
          {isEditing === true ? "Save" : "Edit"}</button>
        <button onClick={()=>deleteTask(task.id)} className="bg-red-600 text-white text-xs py-1 px-2 rounded-md hover:bg-red-500 transition duration-300">
          Delete</button>
        </div>
      </li>
  );
}

export default ToDoItem;
