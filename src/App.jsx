import { useState } from 'react';
import TaskList from './components/TaskList';
import './App.css';

const TASKS = [
  { id: 1, title: 'Mow the lawn', isComplete: false },
  { id: 2, title: 'Cook Pasta', isComplete: true },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

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
