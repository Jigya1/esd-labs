// Section 15 exercise: a counter, three ways.
// Run it:  npm run web   → open http://localhost:5500/web/counter.html
// Follow section 15 of the lab doc: stage 1 → 2 → 3 → 4.
import { useState } from "../src/s15-state.js";

const countEl = document.querySelector("#count");
const parityEl = document.querySelector("#parity");
const inc = document.querySelector("#inc");
const dec = document.querySelector("#dec");
const reset = document.querySelector("#reset");
const stepInput = document.querySelector("#step");

// Stage 1 — one number, one button, one line that updates the page.
/*let count = 0;

inc.addEventListener("click", () => {
  count += 1;
  countEl.textContent = count; // ← the line that "tells the screen"
});

// Stage 2 — TODO: make "− Step" and "Reset" work the same way, then make the
//   parity label ("even"/"odd"), the disabled "−" at zero, and the tab title
//   (document.title) follow the count. Count how many update lines you wrote.
inc.addEventListener("click", () => {
  count += 1;
  countEl.textContent = count;
  parityEl.textContent = count % 2 === 0 ? "even" : "odd";
  dec.disabled = count - 1 < 0;
  document.title = `Count: ${count}`;
});

dec.addEventListener("click", () => {
  count -= 1;
  countEl.textContent = count;
  parityEl.textContent = count % 2 === 0 ? "even" : "odd";
  dec.disabled = count - 1 < 0;
  document.title = `Count: ${count}`;
});

reset.addEventListener("click", () => {
  count = 0;
  countEl.textContent = count;
  dec.disabled = true;
  document.title = `Count: ${count}`;
});*/

// Stage 4 — TODO: write useState in src/s15-state.js, import it, and
//   replace `let count` with  const [getCount, setCount] = useState(0, render);
//   Then add the step input as a second piece of state.
const [getCount, setCount] = useState(0, render);
const [getStep, setStep] = useState(1, render);

// Stage 3 — TODO: move every update line into ONE function, render(),
//   and call it after every change.
function render() {
  countEl.textContent = getCount();
  parityEl.textContent = getCount() % 2 === 0 ? "even" : "odd";
  dec.disabled = getCount() - getStep() < 0;
  document.title = `Count: ${getCount()}`;
}

inc.addEventListener("click", () => {
  setCount((prev) => prev + getStep());
});
dec.addEventListener("click", () => {
  setCount((prev) => prev - getStep());
});
reset.addEventListener("click", () => {
  setCount(0);
});
stepInput.addEventListener("input", () => {
  setStep(Number(stepInput.value));
});

render();