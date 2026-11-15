// Lab day (AI required). This file ends up as the hook described in CONTRACT.md §4.

import { useState, useEffect } from "react";
import { apiFetch } from "../api/client.js";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadCourses() {
      try {
        const data = await apiFetch("/api/courses");

        if (!ignore) {
          setCourses(data);
          setStatus("ready");
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setStatus("error");
        }
      }
    }

    loadCourses();

    return () => {
      ignore = true;
    };
  }, []);

  async function addCourse(courseRequest) {
    const createdCourse = await apiFetch("/api/courses", {
      method: "POST",
      body: courseRequest,
    });

    setCourses((previousCourses) =>
      [...previousCourses, createdCourse].sort((a, b) =>
        a.code.localeCompare(b.code),
      ),
    );

    return createdCourse;
  }

  return {
    courses,
    status,
    error,
    addCourse,
  };
}
