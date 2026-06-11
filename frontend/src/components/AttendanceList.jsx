import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { attendanceApi } from '../api';

export default function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    attendanceApi.getAll()
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this attendance record?')) return;
    await attendanceApi.delete(id);
    setRecords(records.filter((r) => r._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Attendance</h1>
        <Link to="/attendance/new" className="btn btn-primary">+ Add Record</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.studentId ? `${r.studentId.firstName} ${r.studentId.lastName}` : '-'}</td>
              <td>{r.courseId?.name || '-'}</td>
              <td>{r.date ? new Date(r.date).toLocaleDateString() : '-'}</td>
              <td>{r.status}</td>
              <td>{r.remarks || '-'}</td>
              <td>
                <Link to={`/attendance/edit/${r._id}`} className="btn btn-edit btn-sm">Edit</Link>
                <button className="btn btn-delete btn-sm" onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>No attendance records found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
