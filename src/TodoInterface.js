/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import argv from 'minimist';
import InterfaceError from './InterfaceError.js';
import TodoList from './TodoList.js';
import TodoRouter from './TodoRouter.js';

export default class TodoInterface {
  static #introduction = 'Paranccssori Todo applikáció\n\n'
    + '============================\n'
    + 'Parancssori argumentumok:\n'
    + '-l vagy --list   Kilistázza a feladatokat\n'
    + '-a vagy --add   Új feladatot ad hozzá\n'
    + '-r vagy --remove  Eltávolít egy feladatot\n'
    + '-c vagy --completed  Teljesít egy feladatot';

  static validIndex(index, length) {
    if (typeof index !== 'number') throw new InterfaceError('Nem lehetséges az eltávolítás: a megadott index nem szám!');
    if (index > length || index < 1) throw new InterfaceError('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
    return index - 1;
  }

  static validString(str) {
    if (str.length === 0) throw new InterfaceError('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
    return str;
  }

  static #printTodoList(todoList) {
    todoList.print();
  }

  static #addTodoItem(todoList, text) {
    const validText = TodoInterface.validString(text);
    todoList.addTodo(validText);
  }

  static #removeTodoItem(todoList, index) {
    const validIndex = TodoInterface.validIndex(index, todoList.TodoItemsLength());
    todoList.removeTodo(validIndex);
  }

  static #completedTodoItem(todoList, index) {
    const validIndex = TodoInterface.validIndex(index, todoList.TodoItemsLength());
    todoList.completedTodo(validIndex);
  }

  static create(todoList) {
    TodoRouter.setTodoList(todoList);
    if (TodoRouter.isEmptyArgs()) {
      console.log(this.#introduction);
    } else {
      TodoRouter.set('l', this.#printTodoList);
      TodoRouter.set('a', this.#addTodoItem);
      TodoRouter.set('r', this.#removeTodoItem);
      TodoRouter.set('c', this.#completedTodoItem);

      TodoRouter.callCommands();
    }

    /*
    if (this.#isEmptyArgs()) {
      console.log(this.#introduction);
    }
    Object.keys(this.#filterCommands()).forEach((command) => {
      switch (command) {
        case 'l': {
          todoList.print();
          break;
        }
        case 'a': {
          if (this.#commands.add === '') throw new InterfaceError(
            'Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
          todoList.addTodo(this.#commands.add);
          break;
        }
        case 'r': {
          const index = this.#validIndex(this.#commands.remove, todoList.TodoItemsLength());
          todoList.removeTodo(index);
          break;
        }
        case 'c': {
          const index = this.#validIndex(this.#commands.completed, todoList.TodoItemsLength());
          todoList.completedTodo(index);
          break;
        }
        default:
      }
    });
    */
  }
}
