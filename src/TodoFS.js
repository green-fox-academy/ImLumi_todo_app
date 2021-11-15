import fs from 'fs';

export default class TodoFS {
  static readTodo() {
    return JSON.parse(fs.readFileSync('../data/todoList.json', 'utf8'));
  }

  static writeTodo(todoArray) {
    const data = todoArray.map((todo) => todo.toObj());
    fs.writeFileSync('../data/todoList.json', JSON.stringify(data));
  }
}
