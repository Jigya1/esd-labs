# Prompt log — React Lab 2

Part of what you submit. It shows *how* you used AI: did you hand it the contract and the
rules, or type "make it work"? Fill it in **as you go**, not from memory at the end.

- Name and roll number:
- AI tool and plan (e.g. ChatGPT free, Gemini, Claude free, Copilot):

**Log every prompt you send, in order — including the ones that didn't help.** Paste each
prompt in full. One exception: if you pasted CONTRACT.md's prompt 1 unchanged, write
"CONTRACT.md prompt 1, unchanged". Summarise each reply; don't paste whole files.

---

## Prompt 1 — generate

**Sent:**

```text
You are helping me build one small feature in an existing React 19 + Vite app, in JavaScript.

## The feature: a Courses page — list + add

1. The page has a heading "Courses".
2. When the page first appears, load the course list once: GET /api/courses.
   - While waiting, show: Loading courses…
   - If it fails, show: Couldn't load courses: <the error's message>
   - If the list is empty, show: No courses yet.
   - Otherwise a <ul> with one <li> per course, showing two lines like these:
       CS101 · Programming Fundamentals
       4 credits · Computer Science · 34 seats left
     (code · title, then credits · department · seats: "Full" when seatsLeft is 0,
     "1 seat left" when it is 1)
3. Below the list, a form headed "Add a course". One <label> per field, with exactly these
   texts: "Code", "Title", "Department", "Credits", "Capacity", "Description".
   Credits and Capacity are number inputs; Description is a textarea and may be left empty.
   A submit button "Add course".
4. On submit, POST /api/courses with a CourseRequest. credits and capacity must be sent as
   numbers (input values are strings). description is null when left empty. The button is
   disabled until the server answers. No validation in the browser: send what was typed,
   and let the server decide.
5. On success (201): add the course from the response body to the list, keeping the list
   sorted by code. Do NOT reload the whole list. Clear the form.
6. On failure: keep what was typed. Show the error's message above the button. For a 400,
   also show each entry of fieldErrors directly under its own input.

## The API (from the project's openapi.yaml)

GET  /api/courses → 200: an array of Course, sorted by code
POST /api/courses, body: CourseRequest (admin only) →
     201: the created Course
     400: ApiError, message "Validation failed", fieldErrors { field name: reason }
     401 / 403: ApiError (not logged in / not an admin)
     409: ApiError, message "Course code already exists"

Course        { id, code, title, description (string or null), department, credits, capacity, seatsLeft }
CourseRequest { code, title, department, credits, capacity, description (optional, may be null) }
              code: 2–4 uppercase letters then 3 digits, e.g. "CS501"
              credits: whole number 1–6; capacity: whole number 1–500
ApiError      { timestamp, status, error, message, path, fieldErrors (object or null) }

## The API client — already written: use it, don't change it

src/api/client.js exports:
  apiFetch(path, { method = "GET", body } = {})  → resolves with the parsed JSON body
  ApiError  — apiFetch throws it for any non-2xx answer: error.status, error.message, error.fieldErrors
apiFetch handles the base URL, JSON, and the admin login token. Never call fetch directly;
never handle tokens. For example:
  const courses = await apiFetch("/api/courses");
  const created = await apiFetch("/api/courses", { method: "POST", body: courseRequest });

## Where it goes

All files go in src/courses/. The page component is CoursesPage, a named export from
src/courses/CoursesPage.jsx (src/App.jsx already renders it). Import the client as
"../api/client.js". Don't write App.jsx, main.jsx or any CSS: they exist.

## Rules

Use only useState and useEffect. Do not use useMemo, useCallback, useReducer, useRef, or
context. No TypeScript. Plain fetch, no data-fetching library. One View component that only
renders; put fetch and logic in a separate hook or module.
- "Plain fetch" here means apiFetch from src/api/client.js, which wraps fetch.
- No new packages: no axios, React Query, SWR, form or UI libraries. Plain JSX; a few
  className attributes are fine; no CSS file.
- Function components, named exports, .js / .jsx files.

Reply with each file in full, its path on the first line. Keep explanations short.
```

**What came back:** (which files; which hooks it used; anything from the "not yet" list;
anything it did that the contract didn't ask for)

**Did it run?** (`npm run dev`: list loads? add works? 409 shown? fieldErrors shown?
`npm test`: __ passed / __ failed)

**What I did with it:**

---

## Prompt 2 —

**Why I sent it:** (for a fix prompt: which decision in AUDIT.md it carries out)

**Sent:**

```text

```

**What came back:**

**What I kept, and what I rejected:**

---

<!-- Copy the "Prompt 2" block for each further prompt. -->

## Afterwards

- How many prompts did the whole feature take?
- Which of your prompts would you write differently now, and how?
- One thing the rules in prompt 1 prevented (or failed to prevent):
