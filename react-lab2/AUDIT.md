# Audit — React Lab 2

Part of what you submit. Fill in sections 0–4 **before** you ask the AI to change anything:
deciding what's wrong is your job, not the AI's. The sheet you audit against is "The Shape
of a Good React Slice" — section 08 of the lab doc.

Point at code as `file:line`, e.g. `CoursesPage.jsx:14`.

---

## 0. What came back

| File the AI gave you | What's in it (components, hooks) | Lines |
| --- | --- | --- |
|src/courses/useCourses.js |useCourses custom hook; uses useState and useEffect  |105  |
|src/courses/CoursesView.jsx |CoursesView component  |135  |
|src/courses/CoursesPage.jsx |CoursesPage component  |11  |

- Does it run? List loads / valid add appears in order / duplicate code shows the 409
  message / bad input shows fieldErrors under the inputs:
  Yes
- Requests in the Network tab — on page load: __ ; per add: __
2 requests on page load, 1 per add
- `npm test` before any fix: __ passed / __ failed. Which test files fail? 
31 passed, 31 failed
Test files failed: AddCourseForm.test.jsx, fieldErrors.test.jsx, CoursesView.test.jsx, useCourses.test.jsx

## 1. Part A — walk the allowed list

Is each element present, and in the right place?

| Element (the sheet, Part A) | Where it is in the AI's code (`file:line`, or "missing") | Right place? If not, where should it be? |
| --- | --- | --- |
| One View component that only renders |CoursesView.jsx:1–130  |No |It also contains the add-course form. Move the form into AddCourseForm.jsx.
| Fetch + logic in a separate hook or module |useCourses.js:12–107  |No  |The hook should expose courses, status, error, and addCourse(courseRequest).
| `useState` for the course list, at the right level |useCourses.js:13  |Yes  |
| `useState` for the form's inputs, at the right level |useCourses.js:17–19  |No  |Move form input state into AddCourseForm.jsx, since the form owns its inputs.
| `useEffect` — for the initial fetch only (with a cleanup) |useCourses.js:24–38  |No  |Add cleanup to prevent stale responses from updating state, particularly in React StrictMode.
| Props down, callbacks up (the form raises "add this course") |CoursesPage.jsx:6 |No  |Pass onAdd={addCourse} to AddCourseForm. The form should not fetch directly.
| `.map` to render the list, with a stable `key` |CoursesView.jsx:31–32  |Yes  |
| Loading / error / empty states, from one `status` |useCourses.js:14–15 |No  |Replace separate loading/error states with one status state: "loading", "error", or "ready"

## 2. Part B — scan for "not yet"

Search the files (VS Code: Ctrl/Cmd+Shift+F) for each one.

| Not yet | Found? (`file:line`) | What it does in *this* slice | Cut, or keep — and why |
| --- | --- | --- | --- |
| `useMemo` |No  |  |  |
| `useCallback` |No  |  |  |
| `useReducer` |No  |  |  |
| `useRef` |No  |  |  |
| Context (`createContext`, `useContext`) |No  |  |  |
| A data-fetching library, or `axios`, or raw `fetch` instead of `apiFetch` |No  |  |  |
| TypeScript (types, interfaces, `.ts`/`.tsx`) |No  |  |  |
| Anything else nobody taught you (name it) |No  |  |  |

## 3. The rule — every hook and every component split

One row for **each** `useState`, `useEffect` and custom hook call, and for **each**
component. Say what it does *in this slice*. "The AI added it" and "just in case" are not
answers — if you can't name its job, the decision is "cut".

| Hook call or component (`file:line`) | What earns it here? (one sentence) | Keep / cut / move (to where) |
| --- | --- | --- |
|useState – useCourses.js:13  |Stores the course list fetched from the API and updated after adding a course.  |Keep in useCourses  |
|useState – useCourses.js:14-15  |Tracks the initial loading and error states.  |Replace with one status state and one error state in useCourses  |
|useState – useCourses.js:17–19  |Stores the values entered in the Add a course form.  |Move to AddCourseForm.jsx.  |
|useState – useCourses.js:20  |Tracks whether the add-course request is running.  |Move to AddCourseForm.jsx  |
|useState – useCourses.js:21-22  |Stores submission and field validation errors.  |Move to AddCourseForm.jsx  |
|useEffect – useCourses.js:24  |Fetches the initial course list when the hook is mounted.  |Keep in useCourses; add cleanup.  |
|CoursesPage – CoursesPage.jsx:4  |Connects the hook to the page's View and form.  |Keep  |
|CoursesView – CoursesView.jsx:1  |Displays the course list and loading/error/empty states.  |Keep, but remove the form.  |
|AddCourseForm (AddCourseForm.jsx:3) |Owns form inputs, submission state, and submission errors.  |Implement; currently throws a TODO error. |

## 4. Decisions — before any fix prompt

- I will **cut**:

Separate loading and loadError states.
Form state and submission logic from useCourses.
The Add a course form from CoursesView.

- I will **move** (from → to):

Form input state: useCourses.js → AddCourseForm.jsx.
Submission loading and error handling: useCourses.js → AddCourseForm.jsx.
Form rendering: CoursesView.jsx → AddCourseForm.jsx.

- I will **add** (missing from the AI's version):

A separate AddCourseForm.jsx component accepting { onAdd }.
An addCourse(courseRequest) function in useCourses.
A single status state with "loading", "error", and "ready".
Cleanup in the initial-fetch useEffect.
aria-invalid and aria-describedby for fields with validation errors.
role="alert" for form-level errors.

- Other smells I found (state stored that could be computed, a reload after add, browser
  validation, `key={index}`, swallowed errors…):

The View expects { courses, status, error }, but the AI supplied separate loading/error props.
The form expects an onAdd callback, but the AI put API submission logic directly in the hook.
The AI's CoursesView accesses form.code, but the tests don't supply a form prop.
The AI's AddCourseForm is still an unimplemented TODO.
The form must preserve entered values after a failed submission.
The form must clear its values after successful submission.
The hook must use the POST response rather than performing another GET.
The hook must reject with the original API error so the form can display its message and field errors.
---

## 5. Strip check (section 14 of the doc)

For each "not yet" item you removed — one at a time:

| Removed | `npm test` after | The app after (loads / adds / shows errors) |
| --- | --- | --- |
|  |  |  |

If the AI used none, say so here, and say which rule in prompt 1 you think prevented it.
AI used none. This rule in prompt 1 might have prevented it:
"Use only useState and useEffect. Do not use useMemo, useCallback, useReducer, useRef, or
context. No TypeScript. Plain fetch, no data-fetching library. One View component that only
renders; put fetch and logic in a separate hook or module."

## 6. Before / after

|  | Before (the AI's first version) | After (yours) |
| --- | --- | --- |
| Files and components |3 files: useCourses.js, CoursesView.jsx, CoursesPage.jsx. Form was inside CoursesView.  |4 files: useCourses.js, CoursesView.jsx, AddCourseForm.jsx, CoursesPage.jsx. Each has a separate responsibility.  |
| `useState` calls (and where) |Multiple states for courses, loading, errors, form values and submission. Most were in useCourses.js.  |3 state calls in useCourses.js (courses, status, error) and 3 in AddCourseForm.jsx (form values, submitting, form error).  |
| `useEffect` calls |1 in useCourses.js for the initial GET, without cleanup.  |1 in useCourses.js for the initial GET, with cleanup using an ignore flag.  |
| "Not yet" items |Nothing  |Nothing  |
| Requests: on load / per add |GET on initial load; POST on add, followed by the original implementation's list-management logic.  |One GET on initial load; one POST per add. The returned course is inserted in sorted order without another GET. |
| `npm test` |31 passed, 31 failed  |62 passed  |

## 7. Two sentences

- One thing the AI got right that you might not have thought of:
Using an ignore flag in the useEffect cleanup prevents stale API responses from updating state, especially in React StrictMode.
- One thing you will never accept from an AI without checking again:
Whether the implementation actually follows the project contract and passes the tests instead of just looking correct.
