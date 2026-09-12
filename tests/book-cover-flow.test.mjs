import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";

// Exercise the component's actual handlers without a browser dependency.
const source = readFileSync(new URL("../src/components/BookCoverFlow.astro", import.meta.url), "utf8");
const script = stripTypeScriptTypes(source.match(/<script>([\s\S]*?)<\/script>/)[1]);

function createShelf() {
  const document = { activeElement: null };
  class Element extends EventTarget {
    dataset = {};
    attributes = new Map();
    styles = new Map();
    classes = new Set();
    selectors = new Map();
    captured = new Set();
    clientWidth = 360;
    classList = {
      add: (name) => this.classes.add(name),
      remove: (name) => this.classes.delete(name),
      toggle: (name, enabled) => enabled ? this.classes.add(name) : this.classes.delete(name),
      contains: (name) => this.classes.has(name),
    };
    style = { setProperty: (name, value) => this.styles.set(name, value) };
    setAttribute(name, value) { this.attributes.set(name, value); }
    querySelector(selector) { return this.selectors.get(selector); }
    querySelectorAll(selector) { return this.selectors.get(selector); }
    focus() { document.activeElement = this; }
    setPointerCapture(id) { this.captured.add(id); }
    hasPointerCapture(id) { return this.captured.has(id); }
    releasePointerCapture(id) { this.captured.delete(id); }
  }
  const registry = new Map();
  runInNewContext(script, {
    HTMLElement: Element,
    document,
    customElements: {
      get: (name) => registry.get(name),
      define: (name, constructor) => registry.set(name, constructor),
    },
  });
  const shelf = new (registry.get("book-cover-flow"))();
  shelf.dataset.initialIndex = "1";
  const books = ["How to Know a Person", "Steve Jobs", "Range", "The Psychology of Money"].map((title) => {
    const book = new Element();
    book.dataset = { title, author: "Author" };
    return book;
  });
  const buttons = books.map(() => new Element());
  const pickers = books.map(() => new Element());
  const reflections = books.map(() => new Element());
  const stage = new Element();
  const image = new Element();
  const title = new Element();
  shelf.selectors = new Map([
    [".flow-book", books], ["button.flow-select", buttons], [".flow-dot", pickers],
    [".flow-reflected-book", reflections],
    [".flow-title", title], [".flow-author", new Element()],
    [".flow-announcement", new Element()], [".flow-interface", new Element()],
    [".flow-stage", stage],
  ]);
  shelf.connectedCallback();

  // Dispatch at the stage with the original event target, as a bubbled DOM event.
  function pointer(type, x, y, time, target = stage, extra = {}) {
    const event = new Event(type, { bubbles: true, cancelable: true });
    const values = {
      pointerId: 1, pointerType: "touch", isPrimary: true, button: 0,
      clientX: x, clientY: y, timeStamp: time, target, ...extra,
    };
    for (const [name, value] of Object.entries(values)) {
      Object.defineProperty(event, name, { value });
    }
    stage.dispatchEvent(event);
    return event;
  }

  function swipe(distance, target = image, touch = true) {
    pointer("pointerdown", 180, 100, 0, target, { pointerType: touch ? "touch" : "mouse" });
    pointer("pointermove", 180 + Math.sign(distance) * 12, 100, 30, target);
    if (touch) {
      // Touch implicitly captures the image/button. Transferring capture to the
      // stage emits a bubbling loss at that child before the next pointer event.
      // https://www.w3.org/TR/pointerevents3/#process-pending-pointer-capture
      pointer("lostpointercapture", 180, 100, 40, target);
    }
    pointer("pointermove", 180 + distance, 100, 160);
    pointer("pointerup", 180 + distance, 100, 300);
  }
  return { shelf, stage, image, title, books, reflections, buttons, pickers, pointer, swipe };
}

test("touch swipes starting on an image survive implicit capture transfer in both directions", () => {
  const flow = createShelf();
  flow.swipe(-90);
  assert.equal(flow.title.textContent, "Range");
  assert.equal(flow.pickers[2].attributes.get("aria-pressed"), "true");
  flow.swipe(90);
  assert.equal(flow.title.textContent, "Steve Jobs");
  assert.equal(flow.shelf.classList.contains("is-dragging"), false);
  assert.equal(flow.stage.hasPointerCapture(1), false);
});

test("a swipe starting on the cover button survives capture transfer too", () => {
  const flow = createShelf();
  flow.swipe(90, flow.buttons[1]);
  assert.equal(flow.title.textContent, "How to Know a Person");
});

for (const type of ["lostpointercapture", "pointercancel"]) {
  test(`${type} at the stage cancels dragging safely`, () => {
    const flow = createShelf();
    flow.pointer("pointerdown", 180, 100, 0, flow.image);
    flow.pointer("pointermove", 90, 100, 100, flow.image);
    if (type === "lostpointercapture") flow.stage.releasePointerCapture(1);
    flow.pointer(type, 90, 100, 120);
    flow.pointer("pointerup", 90, 100, 300);
    assert.equal(flow.title.textContent, "Steve Jobs");
    assert.equal(flow.shelf.classList.contains("is-dragging"), false);
    assert.equal(flow.stage.hasPointerCapture(1), false);
  });
}

test("vertical touch movement remains available for native page scrolling", () => {
  const flow = createShelf();
  flow.pointer("pointerdown", 180, 100, 0, flow.image);
  const move = flow.pointer("pointermove", 184, 160, 100, flow.image);
  flow.pointer("pointercancel", 184, 160, 120, flow.image);
  assert.equal(move.defaultPrevented, false);
  assert.equal(flow.stage.hasPointerCapture(1), false);
  assert.equal(flow.shelf.classList.contains("is-dragging"), false);
  assert.equal(flow.title.textContent, "Steve Jobs");
});

test("tapping a book still selects it", () => {
  const flow = createShelf();
  flow.pointer("pointerdown", 180, 100, 0, flow.buttons[2]);
  flow.pointer("pointerup", 180, 100, 100, flow.buttons[2]);
  const click = flow.pointer("click", 180, 100, 120, flow.buttons[2], { detail: 1 });
  assert.equal(click.defaultPrevented, false);
  flow.buttons[2].dispatchEvent(new Event("click"));
  assert.equal(flow.title.textContent, "Range");
});

test("mouse dragging still selects a book and suppresses its trailing click", () => {
  const flow = createShelf();
  flow.swipe(-90, flow.image, false);
  assert.equal(flow.title.textContent, "Range");
  const click = flow.pointer("click", 90, 100, 310, flow.buttons[1], { detail: 1 });
  assert.equal(click.defaultPrevented, true);
});

test("swiping beyond the shelf ends stays on the first or last book", () => {
  const flow = createShelf();
  flow.swipe(-900);
  assert.equal(flow.title.textContent, "The Psychology of Money");
  flow.swipe(-90);
  assert.equal(flow.title.textContent, "The Psychology of Money");
  flow.swipe(900);
  assert.equal(flow.title.textContent, "How to Know a Person");
  flow.swipe(90);
  assert.equal(flow.title.textContent, "How to Know a Person");
});

test("reflections follow each book through a partial swipe and its final selection", () => {
  const flow = createShelf();
  const assertMatchingPoses = () => flow.books.forEach((book, index) => {
    assert.deepEqual(flow.reflections[index].styles, book.styles);
    assert.equal(flow.reflections[index].style.zIndex, book.style.zIndex);
  });
  assertMatchingPoses();
  flow.pointer("pointerdown", 180, 100, 0, flow.image);
  flow.pointer("pointermove", 140, 100, 100, flow.image);
  assert.notEqual(flow.books[1].styles.get("--side"), "0");
  assertMatchingPoses();
  flow.pointer("pointermove", 90, 100, 200);
  flow.pointer("pointerup", 90, 100, 400);
  assert.equal(flow.title.textContent, "Range");
  assertMatchingPoses();
});
