import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask } from './store';
import { selectTasks } from './selectors';

export default function TodoApp() {
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch(addTask(input));
    setInput('');
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setInput(task.text);
  };

  const handleUpdate = () => {
    dispatch(editTask({ id: editId, text: input }));
    setEditId(null);
    setInput('');
  };

  return (
    <div>
      <h2>Todo App</h2>

      <input
        placeholder="Enter task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {editId ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add Task</button>
      )}

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}

            <button onClick={() => handleEdit(task)}>
              Edit
            </button>

            <button onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}