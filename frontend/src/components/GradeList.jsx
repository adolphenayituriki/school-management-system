import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gradesApi } from '../api';

export default function GradeList() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gradesApi.getAll()
      .then(setGrades)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this grade record?')) return;
    await gradesApi.delete(id);
    setGrades(grades.filter((g) => g._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Grades</h1>
        <Link to="/grades/new" className="btn btn-primary">+ Add Grade</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Exam Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g._id}>
              <td>{g.studentId ? `${g.studentId.firstName} ${g.studentId.lastName}` : '-'}</td>
              <td>{g.courseId?.name || '-'}</td>
              <td>{g.score}</td>
              <td>{g.grade}</td>
              <td>{g.examType || '-'}</td>
              <td>{g.date ? new Date(g.date).toLocaleDateString() : '-'}</td>
              <td>
                <Link to={`/grades/edit/${g._id}`} className="btn btn-edit btn-sm">Edit</Link>
                <button className="btn btn-delete btn-sm" onClick={() => handleDelete(g._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {grades.length === 0 && (
            <tr><td colSpan="7" style={{ textAlign: 'center', padding: 20 }}>No grades found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
