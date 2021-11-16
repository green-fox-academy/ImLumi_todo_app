import InterfaceError from './src/InterfaceError.js';
import TodoInterface from './src/TodoInterface.js';
import TodoList from './src/TodoList.js';

const todolist = new TodoList();
const dataPath = './data/todoList.json';
todolist.loadTofile(dataPath);
try {
  TodoInterface.create(todolist);
} catch (e) {
  if (e instanceof InterfaceError) {
    console.log(e.message);
  } else {
    console.log(e);
  }
}
todolist.saveToFile(dataPath);
