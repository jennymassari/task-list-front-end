import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';
import axios from 'axios'; // axios to fetch data from the API
import NewTaskForm from './components/NewTaskForm';



const kbaseURL = 'http://127.0.0.1:5000';
//const kbaseURL = 'http://localhost:5000';

//function to match the case with backend
const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.completed_at !== null,
  };

  delete newTask.completed_at;
  // delete newTask.is_complete;
  return newTask;
};


// function that makes the API call to get all tasks
const getAllTasksApi = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then( response => {
      const apiTasks = response.data;
      console.log('API Response:', apiTasks);
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch(error => {
      console.log(error);
    });
};

// API calls to mark tasks as complete or incomplete
const markTaskComplete = (id) => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .then( response => {
      const newTask = convertFromApi(response.data.task);
      return newTask;
    })
    .catch(error => {
      console.log(error);
    });
};

const markTaskIncomplete = (id) => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .then( response => {
      const newTask = convertFromApi(response.data.task);
      return newTask;
    })
    .catch(error => {
      console.log(error);
    });
};

// API call to delete a task
const deleteTaskApi = (id) => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
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

  // Handle toggling task completion (mark complete or incomplete)
  const handleToggleTask = (id) => {
    const task = taskData.find(task => task.id === id);
    const newIsComplete = !task.isComplete;  // Define newIsComplete

    // Optimistic UI update: Update the local state immediately
    setTaskData((prevTaskData) =>
      prevTaskData.map((task) =>
        task.id === id
          ? { ...task, isComplete: newIsComplete }
          : task
      )
    );
    // Update the backend after the UI update
    const updateTask = newIsComplete ? markTaskComplete(id) : markTaskIncomplete(id);
    updateTask
      .then((updatedTask) => {
        setTaskData((prevTaskData) =>
          prevTaskData.map((task) =>
            task.id === id ? updatedTask : task
          )
        );
      })
      .catch((error) => {
        console.log(error);
        getAllTasks(); // Re-fetch tasks in case of error to restore the previous state
      });
  };

  // Handle removing a task
  const handleRemoveTask = (id) => {
    setTaskData((taskData) => taskData.filter((task) => task.id !== id));
    deleteTaskApi(id)
      .catch((error) => {
        console.log('Error deleting task:', error);
        getAllTasks();
      });
  };

  const handleSubmit = (data) => {
    // Make a POST request to the API to create a new task
    axios.post(`${kbaseURL}/tasks`, data)
      .then((result) => {
        // Add the new task to the list of tasks
        setTaskData((prevTaskData) => [convertFromApi(result.data.task), ...prevTaskData]);
        console.log(result);
      })
      .catch((error) => console.log(error));
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm handleSubmit={handleSubmit}/>
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
