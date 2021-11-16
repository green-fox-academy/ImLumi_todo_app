/* eslint-disable import/no-extraneous-dependencies */
import argv from 'minimist';

// argv(process.argv.slice(2, 3),{ alias: { h: 'help', i: 'install', l: 'list' }, string: 'la',
// unknown: (arg) => { console.log(`A(z) ${arg} Ismeretlen`); return false; } }));

export default class TodoInterface {
  static #commands = {};

  static {
    this.#commands = argv(process.argv.slice(2, 4), {
      stopEarly: true,
      alias: { h: 'help', r: 'remove' },
      unknown: (arg) => {
        console.log(`A(z) ${arg} Ismeretlen`);
        return false;
      },
    });
  }

  static commands() {
    return this.#commands;
  }

  help() {
    if (this.argv.h) {
      console.log('Segitek neked');
    }
  }
}
