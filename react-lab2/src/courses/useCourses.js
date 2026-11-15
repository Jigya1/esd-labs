// Lab day (AI required). This file ends up as the hook described in CONTRACT.md §4.

import { useState, useEffect } from "react";
import { apiFetch } from "../api/client.js";

const initialForm = {
  code: "",
  title: "",
  department: "",
  credits: "",
  capacity: "",
  description: "",
};

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Load courses when the page first appears.
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await apiFetch("/api/courses");
        setCourses(data);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  // Update a form field.
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  // Submit a new course.
  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setSubmitError("");
    setFieldErrors({});

    const courseRequest = {
      code: form.code,
      title: form.title,
      department: form.department,
      credits: Number(form.credits),
      capacity: Number(form.capacity),
      description: form.description === "" ? null : form.description,
    };

    try {
      const createdCourse = await apiFetch("/api/courses", {
        method: "POST",
        body: courseRequest,
      });

      // Add the returned course without reloading the list.
      setCourses((previousCourses) =>
        [...previousCourses, createdCourse].sort((a, b) =>
          a.code.localeCompare(b.code)
        )
      );

      // Clear the form after successful creation.
      setForm(initialForm);
    } catch (error) {
      setSubmitError(error.message);

      if (error.status === 400 && error.fieldErrors) {
        setFieldErrors(error.fieldErrors);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return {
    courses,
    loading,
    loadError,
    form,
    submitting,
    submitError,
    fieldErrors,
    handleChange,
    handleSubmit,
  };
}
