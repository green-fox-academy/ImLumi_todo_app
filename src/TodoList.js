import TodoFS from './TodoFS.js';
import TodoItem from './TodoItem.js';

export default class TodoList {
  #todoItems = [];

  #addTodo(todo, completed = false) {
    this.#todoItems.push(new TodoItem(todo, completed));
  }

  addTodo(todo) {
    this.#addTodo(this.#todoItems.length + 1, todo);
  }

  loadTofile() {
    TodoFS.readTodo().forEach((todo) => {
      this.#addTodo(todo.text, todo.completed);
    });
  }

  saveToFile() {
    TodoFS.writeTodo(this.#todoItems);
  }

  print() {
    this.#todoItems.forEach((todo, index) => console.log(`${index + 1} - ${todo.toString()}`));
  }
}
