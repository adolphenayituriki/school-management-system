import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentsApi } from '../api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentsApi.getAll()
      .then(setStudents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    await studentsApi.delete(id);
    setStudents(students.filter((s) => s._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Students</h1>
        <Link to="/students/new" className="btn btn-primary">+ Add Student</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.gender}</td>
              <td>{s.phone}</td>
              <td>{s.classId?.name || '-'}</td>
              <td>
                <Link to={`/students/edit/${s._id}`} className="btn btn-edit btn-sm">Edit</Link>
                <button className="btn btn-delete btn-sm" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>No students found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
