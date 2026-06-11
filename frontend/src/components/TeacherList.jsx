import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teachersApi } from '../api';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teachersApi.getAll()
      .then(setTeachers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this teacher?')) return;
    await teachersApi.delete(id);
    setTeachers(teachers.filter((t) => t._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Teachers</h1>
        <Link to="/teachers/new" className="btn btn-primary">+ Add Teacher</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t._id}>
              <td>{t.firstName} {t.lastName}</td>
              <td>{t.email}</td>
              <td>{t.specialization || '-'}</td>
              <td>{t.phone}</td>
              <td>{t.gender}</td>
              <td>
                <Link to={`/teachers/edit/${t._id}`} className="btn btn-edit btn-sm">Edit</Link>
                <button className="btn btn-delete btn-sm" onClick={() => handleDelete(t._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>No teachers found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
