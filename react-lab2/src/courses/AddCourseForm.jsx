// Lab day (AI required). This file ends up as the form described in CONTRACT.md §4.
import { useState } from "react";

const initialForm = {
  code: "",
  title: "",
  department: "",
  credits: "",
  capacity: "",
  description: "",
};

export function AddCourseForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    const courseRequest = {
      code: form.code,
      title: form.title,
      department: form.department,
      credits: Number(form.credits),
      capacity: Number(form.capacity),
      description: form.description === "" ? null : form.description,
    };

    try {
      await onAdd(courseRequest);

      setForm(initialForm);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  const fieldErrors = error?.fieldErrors || {};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="code">Code</label>
        <input
          id="code"
          name="code"
          type="text"
          value={form.code}
          onChange={handleChange}
          aria-invalid={fieldErrors.code ? "true" : undefined}
          aria-describedby={fieldErrors.code ? "code-error" : undefined}
        />
        {fieldErrors.code && <p id="code-error">{fieldErrors.code}</p>}
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          aria-invalid={fieldErrors.title ? "true" : undefined}
          aria-describedby={fieldErrors.title ? "title-error" : undefined}
        />
        {fieldErrors.title && <p id="title-error">{fieldErrors.title}</p>}
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <input
          id="department"
          name="department"
          type="text"
          value={form.department}
          onChange={handleChange}
          aria-invalid={fieldErrors.department ? "true" : undefined}
          aria-describedby={
            fieldErrors.department ? "department-error" : undefined
          }
        />
        {fieldErrors.department && (
          <p id="department-error">{fieldErrors.department}</p>
        )}
      </div>

      <div>
        <label htmlFor="credits">Credits</label>
        <input
          id="credits"
          name="credits"
          type="number"
          value={form.credits}
          onChange={handleChange}
          aria-invalid={fieldErrors.credits ? "true" : undefined}
          aria-describedby={fieldErrors.credits ? "credits-error" : undefined}
        />
        {fieldErrors.credits && <p id="credits-error">{fieldErrors.credits}</p>}
      </div>

      <div>
        <label htmlFor="capacity">Capacity</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          aria-invalid={fieldErrors.capacity ? "true" : undefined}
          aria-describedby={fieldErrors.capacity ? "capacity-error" : undefined}
        />
        {fieldErrors.capacity && (
          <p id="capacity-error">{fieldErrors.capacity}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          aria-invalid={fieldErrors.description ? "true" : undefined}
          aria-describedby={
            fieldErrors.description ? "description-error" : undefined
          }
        />
        {fieldErrors.description && (
          <p id="description-error">{fieldErrors.description}</p>
        )}
      </div>

      {error && <p role="alert">{error.message}</p>}

      <button type="submit" disabled={submitting}>
        Add course
      </button>
    </form>
  );
}
