import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  // creating empty array to store all tasks

  const [allTask, setAllTask] = useState([]);

  // creating a variable to store new task

  const [newTask, setNewTask] = useState("");

  //////////// Add Task Function ///////////////////

  function addTask() {
    // if user try to add empty task, gives alert
    if (newTask === "") {
      alert("please add a task first");
      return;
    }

    // create a task object, to pass id as timestamp and flag for completion
    const taskObj = {
      id: Date.now(),
      name: newTask,
      isComplete: false,
    };

    // make a copy of original task array
    const tempAllTasks = allTask.slice();

    // adding newly added task to temporary array
    tempAllTasks.push(taskObj);

    // updating orignal array
    setAllTask(tempAllTasks);

    console.log(allTask);

    // making input box blank again
    setNewTask("");
  }

  ///////////////// Delete Task function ////////////////////

  function deleteTask(id) {
    // no need to create a copy here, filter returns a new array
    const tempAllTask = allTask.filter((item) => {
      return item.id !== id;
    });

    setAllTask(tempAllTask);
  }

  ////////////// Toggle task function //////////////////////

  function toggleTask(id) {
    // made a temporary copy of array
    // const tempAllTask = allTask.slice();

    // using map with spread
    //     setAllTask(tempAllTask.map((item) =>
    //       item.id === id ? {...item , isComplete : !item.isComplete } : item
    //   ))
    // }

    // using map without spread
    // we are creating a new object and returning instead of directly modifying as react is
    // against direct mutation, even tho we made a copy, the items of array reference still point to orignal item

    // no need to make a copy, map returns a new array

    const tempAllTask = allTask.map((item) => {
      if (item.id === id) {
        const newItem = {
          id: item.id,
          name: item.name,
          isComplete: !item.isComplete, // flip its value -> true to false and vice versa
        };
        return newItem;
      } else return item;
    });

    setAllTask(tempAllTask);
  }

  /////////// Edit task function /////////////////////////

  function editTask(id, newText) {

    // No need to create a copy here, map returns a new array

    const tempArray = allTask.map((item) => {
      if (item.id === id) {
        const newTaskObj = {
          id: item.id,
          name: newText,
          isComplete: item.isComplete,
        };
        return newTaskObj;
      } else return item;
    });

    setAllTask(tempArray);
  }

  return (
    <div>
      <h3> Add a new task: </h3>
      <input
        type="text"
        value={newTask} // sets initial value of input value to current state value
        onChange={(event) => setNewTask(event.target.value)} // event.target.value holds the type value
        // setNewTask is setter function of newTask state
        // above 2 lines make sure the UI and state are always in sync
        placeholder="Enter a new task..."
      />
      <button onClick={addTask}>Add Task</button>
      <hr /> {/* horizontal line */}
      {allTask.length === 0 ? (
        <p>Please add some task....</p>
      ) : (
        <ul>
          {allTask.map((item) => {
            return (
              <ToDoItem
                key={item.id}
                task={item}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ToDoList;
