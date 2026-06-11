import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { coursesApi, teachersApi, classesApi } from '../api';

export default function CourseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', description: '', credits: 3, teacherId: '', classId: '' });

  useEffect(() => {
    teachersApi.getAll().then(setTeachers);
    classesApi.getAll().then(setClasses);
    if (isEdit) {
      coursesApi.getById(id).then((c) => {
        setForm({
          name: c.name || '',
          code: c.code || '',
          description: c.description || '',
          credits: c.credits || 3,
          teacherId: c.teacherId?._id || '',
          classId: c.classId?._id || '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await coursesApi.update(id, form);
    } else {
      await coursesApi.create(form);
    }
    navigate('/courses');
  };

  return (
    <div>
      <div className="page-header"><h1>{isEdit ? 'Edit Course' : 'Add Course'}</h1></div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Code</label>
            <input name="code" value={form.code} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Course Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Credits</label>
            <input name="credits" type="number" min="1" max="10" value={form.credits} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Teacher</label>
            <select name="teacherId" value={form.teacherId} onChange={handleChange}>
              <option value="">-- Select Teacher --</option>
              {teachers.map((t) => <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Class</label>
            <select name="classId" value={form.classId} onChange={handleChange}>
              <option value="">-- Select Class --</option>
              {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            <button type="button" className="btn" style={{ background: '#e0e0e0' }} onClick={() => navigate('/courses')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
