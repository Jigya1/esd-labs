// Lab day (AI required). This file ends up as the View described in CONTRACT.md §4.

export function CoursesView({
  courses,
  loading,
  loadError,
  form,
  submitting,
  submitError,
  fieldErrors,
  handleChange,
  handleSubmit,
}) {
  function getSeatsText(seatsLeft) {
    if (seatsLeft === 0) return "Full";
    if (seatsLeft === 1) return "1 seat left";
    return `${seatsLeft} seats left`;
  }

  function renderFieldError(field) {
    return fieldErrors[field] ? (
      <p className="field-error">{fieldErrors[field]}</p>
    ) : null;
  }

  return (
    <div className="courses-page">
      <h1>Courses</h1>

      {/* Course list */}
      {loading ? (
        <p>Loading courses…</p>
      ) : loadError ? (
        <p>Couldn't load courses: {loadError}</p>
      ) : courses.length === 0 ? (
        <p>No courses yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <div>
                {course.code} · {course.title}
              </div>

              <div>
                {course.credits} credits · {course.department} ·{" "}
                {getSeatsText(course.seatsLeft)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add course form */}
      <h2>Add a course</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            value={form.code}
            onChange={handleChange}
          />
          {renderFieldError("code")}
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {renderFieldError("title")}
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
          {renderFieldError("department")}
        </div>

        <div>
          <label htmlFor="credits">Credits</label>
          <input
            id="credits"
            name="credits"
            type="number"
            value={form.credits}
            onChange={handleChange}
          />
          {renderFieldError("credits")}
        </div>

        <div>
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
          />
          {renderFieldError("capacity")}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {renderFieldError("description")}
        </div>

        {/* Submission error */}
        {submitError && <p className="error">{submitError}</p>}

        <button type="submit" disabled={submitting}>
          Add course
        </button>
      </form>
    </div>
  );
}
