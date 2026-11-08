// Section 06 — From state to screen: views
// Pure functions: state in, plain data describing the screen out. No DOM here.
// Nothing they return is ever stored in state — it's worked out fresh on every render.

// What one course card shows.
//   { id, heading, meta, seats, inPlanner, buttonLabel, disabled }
//   heading      "CS402 · Enterprise Software Development"
//   meta         "4 credits · Computer Science"
//   seats        "Full" | "1 seat left" | "12 seats left"
//   inPlanner    is this course already in the planner?
//   buttonLabel  "Remove" if in the planner, otherwise "Add"
//   disabled     true only for a FULL course that is NOT in the planner
export function cardView(course, planner) {
  const inPlanner = planner.some((c) => c.id === course.id);
  return {
    id: course.id,
    heading: `${course.code} · ${course.title}`,
    meta: `${course.credits} credits · ${course.department}`,
    seats:
      course.seatsLeft === 0
        ? "Full"
        : course.seatsLeft === 1
          ? `${course.seatsLeft} seat left`
          : `${course.seatsLeft} seats left`,
    inPlanner: inPlanner,
    buttonLabel: inPlanner ? "Remove" : "Add",
    disabled: course.seatsLeft === 0 && inPlanner === false ? true : false,
  };
}

// The planner summary.
//   { count, credits, overLimit, text }
//   text: "Nothing planned yet" | "1 course · 4 credits" | "3 courses · 10 credits"
//   overLimit: credits > 24
export function summaryView(planner) {
  const count = planner.length;
  const credits = planner.reduce((total, course) => total + course.credits, 0);
  const text =
    count === 0
      ? "Nothing planned yet"
      : count === 1
        ? `${count} course · ${credits} credits`
        : `${count} courses · ${credits} credits`;
  return {
    count: count,
    credits: credits,
    overLimit: credits > 24,
    text: text,
  };
}

// The status line above the list.
//   { message, showRetry }
//   loading → "Loading courses…"
//   error   → `Couldn't load courses: ${state.error}`, with showRetry true
//   ready with no courses → "No courses match."
//   anything else → ""  (showRetry false except for errors)
export function statusView(state) {
  if (state.status === "loading")
    return { message: "Loading courses…", showRetry: false };
  else if (state.status === "error")
    return {
      message: `Couldn't load courses: ${state.error}`,
      showRetry: true,
    };
  else if (state.status === "ready" && state.courses.length === 0)
    return { message: "No courses match.", showRetry: false };
  else return { message: "", showRetry: false };
}

// The SGPA calculator.
// Grade points on a 10-point scale:
export const GRADE_POINTS = Object.freeze({
  A: 10,
  "A-": 9,
  B: 8,
  "B-": 7,
  C: 6,
  D: 5,
  F: 0,
});

// SGPA = sum(credits × points) / sum(credits), over the planned courses that HAVE a grade.
//   { graded, total, credits, sgpa, text }
//   graded   how many planned courses have a grade
//   total    how many courses are planned
//   credits  the credits of the graded courses
//   sgpa     a number rounded to 2 decimals, or null when nothing is graded
//   text     "Add courses to the planner first"           (nothing planned)
//            "Pick a grade to see your SGPA"              (planned, none graded)
//            "SGPA 8.40 · 3 of 4 courses graded"           (some graded)
//            "SGPA 8.40"                                   (all graded)
//   (sgpa in text always shows 2 decimals: 9 → "9.00")
export function sgpaView(planner, grades) {
  const gradedCourses = planner.filter((course) => {
    return Object.hasOwn(grades, course.id);
  });
  const graded = gradedCourses.length;
  const credits = gradedCourses.reduce(
    (total, course) => total + course.credits,
    0,
  );
  const weightedPoints = gradedCourses.reduce(
    (total, course) => total + course.credits * GRADE_POINTS[grades[course.id]],
    0,
  );
  const sgpa =
    graded === 0 ? null : Number((weightedPoints / credits).toFixed(2));
  let text;
  if (planner.length === 0) text = "Add courses to the planner first";
  else if (planner.length > 0 && graded === 0)
    text = "Pick a grade to see your SGPA";
  else if (graded < planner.length)
    text = `SGPA ${sgpa.toFixed(2)} · ${graded} of ${planner.length} courses graded`;
  else if (graded === planner.length) text = `SGPA ${sgpa.toFixed(2)}`;
  return {
    graded: graded,
    total: planner.length,
    credits: credits,
    sgpa: sgpa,
    text: text,
  };
}
