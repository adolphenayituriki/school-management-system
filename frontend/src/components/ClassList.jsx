import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { classesApi } from '../api';

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    classesApi.getAll()
      .then(setClasses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this class?')) return;
    await classesApi.delete(id);
    setClasses(classes.filter((c) => c._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Classes</h1>
        <Link to="/classes/new" className="btn btn-primary">+ Add Class</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Academic Year</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.section || '-'}</td>
              <td>{c.academicYear || '-'}</td>
              <td>{c.teacherId ? `${c.teacherId.firstName} ${c.teacherId.lastName}` : '-'}</td>
              <td>
                <Link to={`/classes/edit/${c._id}`} className="btn btn-edit btn-sm">Edit</Link>
                <button className="btn btn-delete btn-sm" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {classes.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: 'center', padding: 20 }}>No classes found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
