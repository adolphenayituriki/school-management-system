import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesApi } from '../api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi.getAll()
      .then(setCourses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return;
    await coursesApi.delete(id);
    setCourses(courses.filter((c) => c._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Courses</h1>
        <Link to="/courses/new" className="btn btn-primary">+ Add Course</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Teacher</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.credits}</td>
              <td>{c.teacherId ? `${c.teacherId.firstName} ${c.teacherId.lastName}` : '-'}</td>
              <td>{c.classId?.name || '-'}</td>
              <td>
                <Link to={`/courses/edit/${c._id}`} className="btn btn-edit btn-sm">Edit</Link>
                <button className="btn btn-delete btn-sm" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>No courses found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
