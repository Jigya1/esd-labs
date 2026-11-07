// Section 10 — Immutable updates (the planner)
// A planner is an array of course ids, e.g. [4, 10, 18].
// Every function returns a NEW value and never changes its input.

// Add an id. If it is already there, return the SAME array (nothing changed).
export function addToPlanner(planner, courseId) {
  return planner.includes(courseId) ? planner : [...planner, courseId];
}

// Remove an id. If it is not there, return the SAME array.
export function removeFromPlanner(planner, courseId) {
  return planner.includes(courseId)
    ? planner.filter((id) => id != courseId)
    : planner;
}

// Return a new course object with some fields changed.
export function updateCourse(course, changes) {
  return { ...course, ...changes };
}

// Return a new list where the matching course has one fewer seat.
// Untouched courses must be the SAME objects as before.
// If the course is full or not found, return the SAME list.
export function takeSeat(courses, courseId) {
  return courses.some((c) => c.id === courseId && c.seatsLeft > 0)
    ? courses.map((c) =>
        c.id == courseId && c.seatsLeft > 0
          ? { ...c, seatsLeft: c.seatsLeft - 1 }
          : c,
      )
    : courses;
}
