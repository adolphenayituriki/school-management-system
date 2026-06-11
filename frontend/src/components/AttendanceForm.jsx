import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { attendanceApi, studentsApi, coursesApi } from '../api';

export default function AttendanceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ studentId: '', courseId: '', date: '', status: 'Present', remarks: '' });

  useEffect(() => {
    studentsApi.getAll().then(setStudents);
    coursesApi.getAll().then(setCourses);
    if (isEdit) {
      attendanceApi.getById(id).then((r) => {
        setForm({
          studentId: r.studentId?._id || '',
          courseId: r.courseId?._id || '',
          date: r.date ? r.date.split('T')[0] : '',
          status: r.status || 'Present',
          remarks: r.remarks || '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await attendanceApi.update(id, form);
    } else {
      await attendanceApi.create(form);
    }
    navigate('/attendance');
  };

  return (
    <div>
      <div className="page-header"><h1>{isEdit ? 'Edit Attendance' : 'Add Attendance'}</h1></div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student</label>
            <select name="studentId" value={form.studentId} onChange={handleChange} required>
              <option value="">-- Select Student --</option>
              {students.map((s) => <option key={s._id} value={s._id}>{s.firstName} {s.lastName}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Course</label>
            <select name="courseId" value={form.courseId} onChange={handleChange} required>
              <option value="">-- Select Course --</option>
              {courses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            <button type="button" className="btn" style={{ background: '#e0e0e0' }} onClick={() => navigate('/attendance')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
