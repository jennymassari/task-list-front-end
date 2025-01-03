import PropTypes from 'prop-types';
import './Task.css';

const Task = ({
  id,
  title,
  isComplete,
  onIsComplete,
  onRemove
}) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : ' ';

  const onCompleteClick = () => {
    onIsComplete(id);
  };

  const onRemoveClick = () => {
    onRemove(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onCompleteClick}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={onRemoveClick}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onIsComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Task;
