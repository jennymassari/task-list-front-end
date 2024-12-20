// import React from "react";
import { useState } from 'react';

const NewTaskForm = ({ handleSubmit }) => {
  // const [name, setName] = useState('');
  const kDefaultFromState = {
    title: '',
    isComplete: 'no',
};
  const [formData, setFormData] = useState(kDefaultFromState);
  // const [name, setName] = useState('');

  const handleChange = event => {
    //get the name or value of the field that changed
	  const fieldName = event.target.name;
	  const fieldValue = event.target.value;
    //update the state with the new form data
	  const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    // Prevent the default form submit behavior
	  event.preventDefault();
    // Call the handleSubmit function with the form data
	  handleSubmit(formData);// Pass form data to the parent
    // Reset the form
    setFormData(kDefaultFromState);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor="title"> Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="isComplete">isComplete:</label>
        <select
          name="isComplete"
          value={formData.isComplete}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

export default NewTaskForm;



