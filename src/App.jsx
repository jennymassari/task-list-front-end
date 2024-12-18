import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   { id: 1, title: 'Mow the lawn', isComplete: false },
//   { id: 2, title: 'Cook Pasta', isComplete: true },
// ];

const kbaseURL = 'http://127.0.0.1:5000';
//const kbaseURL = 'http://localhost:5000';

// function that makes the API call
const getAllTasksApi = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then( response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const taskApi = (id) => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .then( response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

function App (){
  const [taskData, setTaskData] = useState([]);

  //function to calls the function getAllTasksApi
  const getAllTasks = () => {
    getAllTasksApi()
      .then(tasks => {
        setTaskData(tasks);
      });
  };

  // useEffect to call the function getAllTasks when the component mounts
  useEffect(() => {
    getAllTasks();
  }, []);

  const handleToggleTask = (id) => {
    setTaskData((taskData) =>
      taskData.map((task) =>
        task.id === id
          ? { ...task, isComplete: !task.isComplete }
          : task
      )
    );
  };

  const handleRemoveTask = (id) => {
    setTaskData((taskData) => taskData.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={taskData}
          onIsComplete={handleToggleTask}
          onRemove={handleRemoveTask}
        />
      </main>
    </div>
  );
};

export default App;
