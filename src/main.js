import TodoList from './TodoList.js';

const todolist = new TodoList();

// todolist.addTodo('Inni egy kávét', true);
// todolist.addTodo('Megírni a feladatot');
// todolist.addTodo('Lefeküdni aludni');
todolist.loadTofile();
todolist.print();
