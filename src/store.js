import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: { tasks: [] },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare(text) {
        return { payload: { id: nanoid(), text } };
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    editTask(state, action) {
      const { id, text } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) task.text = text;
    }
  }
});

export const { addTask, deleteTask, editTask } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

export default store;