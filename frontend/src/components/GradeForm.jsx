import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gradesApi, studentsApi, coursesApi } from '../api';

export default function GradeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ studentId: '', courseId: '', score: '', grade: 'A', examType: 'Quiz', date: '' });

  useEffect(() => {
    studentsApi.getAll().then(setStudents);
    coursesApi.getAll().then(setCourses);
    if (isEdit) {
      gradesApi.getById(id).then((g) => {
        setForm({
          studentId: g.studentId?._id || '',
          courseId: g.courseId?._id || '',
          score: g.score || '',
          grade: g.grade || 'A',
          examType: g.examType || 'Quiz',
          date: g.date ? g.date.split('T')[0] : '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, score: Number(form.score) };
    if (isEdit) {
      await gradesApi.update(id, data);
    } else {
      await gradesApi.create(data);
    }
    navigate('/grades');
  };

  return (
    <div>
      <div className="page-header"><h1>{isEdit ? 'Edit Grade' : 'Add Grade'}</h1></div>
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
            <label>Score (0-100)</label>
            <input name="score" type="number" min="0" max="100" value={form.score} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Grade</label>
            <select name="grade" value={form.grade} onChange={handleChange}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="form-group">
            <label>Exam Type</label>
            <select name="examType" value={form.examType} onChange={handleChange}>
              <option value="Quiz">Quiz</option>
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            <button type="button" className="btn" style={{ background: '#e0e0e0' }} onClick={() => navigate('/grades')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
