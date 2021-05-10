import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);

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
  const deleteTask = () => {
    axios
      .delete(`https://drf-api210509.herokuapp.com/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token 409ef3138e24e52a9cb355bf69bdcac8af8cd9d1',
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.id}
          </li>
        ))}
      </ul>
      Set id <br />
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get task
      </button>
      <button type="button" onClick={() => deleteTask()}>
        delete task
      </button>
      <h3>
        {selectedTask.title} {selectedTask.id}
      </h3>
    </div>
  );
};

export default DrfApiFetch;
