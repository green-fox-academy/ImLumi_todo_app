import fs from 'fs';

export default class TodoFS {
  static readTodoFile(path) {
    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
      return [];
    }
  }

  static writeTodoFile(path, todoArray) {
    const data = todoArray.map((todo) => todo.toObj());
    fs.writeFileSync(path, JSON.stringify(data));
  }
}
