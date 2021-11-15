export default class TodoItem {
  #text;
  #comleted;
  constructor(toDo, comleted = false) {
    this.#text = toDo;
    this.#comleted = comleted;
  }

  comleted() {
    this.#comleted = true;
  }

  toString() {
    return `[${this.#comleted ? 'X' : ' '}] ${this.#text}`;
  }

  toObj() {
    const jsonObj = {
      text: this.#text,
      completed: this.#comleted,
    };
    return jsonObj;
  }
}
