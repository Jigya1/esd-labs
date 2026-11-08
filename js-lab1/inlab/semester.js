// IN-LAB TASK (AI closed). Do this in the lab, not at home.
//
// A study plan groups planned course ids by semester:
//
//   const plan = {
//     student: "Asha",
//     semesters: { "2026-odd": [4, 10], "2027-even": [18] },
//   };
//
// Write addToSemester(plan, semester, courseId). It returns a NEW plan where
// that semester's list ends with courseId. Rules:
//   - never change the input (the tests freeze it — mutation throws)
//   - the student and every OTHER semester stay the SAME references
//   - a semester that does not exist yet is created
//   - if the id is already in that semester, return the SAME plan
//
// Stretch: moveCourse(plan, from, to, courseId) — out of one semester, into another.

export function addToSemester(plan, semester, courseId) {
  if (Object.hasOwn(plan.semesters, semester)) {
    if (plan.semesters[semester]?.includes(courseId)) return plan;
  }
  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [semester]: [...(plan.semesters[semester] || []), courseId],
    },
  };
}

export function moveCourse(plan, from, to, courseId) {
  if (!plan.semesters[from].includes(courseId) || from === to) return plan;
  const remaining = plan.semesters[from].filter((id) => id !== courseId);
  const updatedPlan = {
    ...plan,
    semesters: { ...plan.semesters, [from]: remaining },
  };
  return addToSemester(updatedPlan, to, courseId);
}
