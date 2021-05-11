import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);
  const [editedTask, setEditedTask] = useState({ id: '', title: '' });

  useEffect(() => {
    axios
      .get('https://drf-api210509.herokuapp.com/api/tasks/', {
        headers: {
          Authorization: 'Token 409ef3138e24e52a9cb355bf69bdcac8af8cd9d1',
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`https://drf-api210509.herokuapp.com/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token 409ef3138e24e52a9cb355bf69bdcac8af8cd9d1',
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };
  const deleteTask = (id) => {
    axios
      .delete(`https://drf-api210509.herokuapp.com/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token 409ef3138e24e52a9cb355bf69bdcac8af8cd9d1',
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
        if (editedTask.id === id) {
          setEditedTask({ id: '', title: '' });
        }
      });
  };

  const newTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`https://drf-api210509.herokuapp.com/api/tasks/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token 409ef3138e24e52a9cb355bf69bdcac8af8cd9d1',
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
      });
  };

  const handleInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      Set id <br />
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get task
      </button>
      {/* <button type="button" onClick={() => deleteTask()}>
        delete task
      </button> */}
      <h3>
        {selectedTask.title} {selectedTask.id}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New task ?"
        required
      />
      <button onClick={() => newTask(editedTask)}>Create</button>
    </div>
  );
};

export default DrfApiFetch;
