import { createSelector } from 'reselect';

const selectTodos = state => state.todos;

export const selectTasks = createSelector(
  [selectTodos],
  (todos) => todos.tasks
);