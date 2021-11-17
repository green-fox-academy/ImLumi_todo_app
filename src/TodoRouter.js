/* eslint-disable import/no-extraneous-dependencies */
import argv from 'minimist';

export default class TodoRouter {
  static #commands = {};
  static #functionStacks = [];
  static #todoList = null;
  static #validArgs = {
    l: 'list', a: 'add', r: 'remove', c: 'completed',
  };

  static {
    this.#commands = argv(process.argv.slice(2, 4), {
      alias: this.#validArgs,
      string: 'a',
      unknown: (arg) => {
        console.log(`A(z) ${arg} argumentum nem támogatott!\n`);
        return false;
      },
    });
  }

  static setTodoList(todoList) {
    this.#todoList = todoList;
  }

  static isEmptyArgs() {
    return Object.keys(this.#commands).length === 1;
  }

  static set(command, fn) {
    if (command in this.#commands) {
      const args = [this.#todoList, this.#commands[command]];
      this.#functionStacks.push({ fn, args });
    }
  }

  static callCommands() {
    this.#functionStacks.forEach(({ fn, args }) => fn(...args));
  }
}
