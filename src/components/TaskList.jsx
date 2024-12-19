import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onIsComplete, onRemove }) => {
  // Create an array of Task components
  const taskComponents = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        onIsComplete={onIsComplete}
        onRemove={onRemove}
      />
    );
  });

  return <ul className="tasks__list no-bullet">{taskComponents}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onIsComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TaskList;
