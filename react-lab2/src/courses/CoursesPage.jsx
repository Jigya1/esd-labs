// Lab day (AI required): the Courses page — list + add. src/App.jsx renders it.
// You generate it with AI from CONTRACT.md, then audit and fix it (doc sections 10–14).

import { useCourses } from "./useCourses.js";
import { CoursesView } from "./CoursesView.jsx";

export function CoursesPage() {
  const coursesData = useCourses();

  return <CoursesView {...coursesData} />;
}
