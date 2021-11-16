/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import argv from 'minimist';
import InterfaceError from './InterfaceError.js';
import TodoList from './TodoList.js';

export default class TodoInterface {
  static #commands = {};
  static #validArgs = {
    l: 'list', a: 'add', r: 'remove', c: 'completed',
  };

  static {
    this.#commands = argv(process.argv.slice(2), {
      alias: this.#validArgs,
      string: 'a',
      unknown: (arg) => {
        console.log(`A(z) ${arg} argumentum nem támogatott!\n`);
        return false;
      },
    });
  }

  static commands() {
    return this.#commands;
  }

  static #validIndex(index, length) {
    if (typeof index !== 'number') throw new InterfaceError('Nem lehetséges az eltávolítás: a megadott index nem szám!');
    if (index > length || index < 1) throw new InterfaceError('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
    return index - 1;
  }

  static #filteredCommands() {
    const filteredCmd = Object.entries(this.#commands).filter(([arg]) => arg in this.#validArgs);
    return Object.fromEntries(filteredCmd);
  }

  /** @param {TodoList} todoList */
  static create(todoList) {
    if (Object.keys(this.#commands).length === 1) {
      console.log('Paranccssori Todo applikáció\n\n============================\nParancssori argumentumok:\n- l vagy --list   Kilistázza a feladatokat\n- a vagy --add   Új feladatot ad hozzá\n- r vagy --remove  Eltávolít egy feladatot\n- c vagy --completed  Teljesít egy feladatot');
    }
    Object.keys(this.#filteredCommands()).forEach((command) => {
      switch (command) {
        case 'l': {
          todoList.print();
          break;
        }
        case 'a': {
          if (this.#commands.add === '') throw new InterfaceError('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
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
  }
}
