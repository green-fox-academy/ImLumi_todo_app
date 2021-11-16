import TodoFS from './TodoFS.js';
import TodoItem from './TodoItem.js';

export default class TodoList {
  #todoItems = [];

  #addTodo(todo, completed = false) {
    this.#todoItems.push(new TodoItem(todo, completed));
  }

  completedTodo(index) {
    this.#todoItems[index].comleted();
  }

  removeTodo(index) {
    this.#todoItems.splice(index, 1);
  }

  addTodo(todo) {
    this.#addTodo(todo);
  }

  loadTofile(path) {
    if (TodoFS.readTodoFile(path).length > 0) {
      TodoFS.readTodoFile(path).forEach((todo) => {
        this.#addTodo(todo.text, todo.completed);
      });
    }
  }

  saveToFile(path) {
    TodoFS.writeTodoFile(path, this.#todoItems);
  }

  TodoItemsLength() {
    return this.#todoItems.length;
  }

  print() {
    if (this.#todoItems.length > 0) {
      this.#todoItems.forEach((todo, index) => console.log(`${index + 1} - ${todo.toString()}`));
    } else {
      console.log('Nincs mára tennivalód! :)');
    }
  }
}
