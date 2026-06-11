import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { classesApi, teachersApi } from '../api';

export default function ClassForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', section: '', academicYear: '', teacherId: '' });

  useEffect(() => {
    teachersApi.getAll().then(setTeachers);
    if (isEdit) {
      classesApi.getById(id).then((c) => {
        setForm({
          name: c.name || '',
          section: c.section || '',
          academicYear: c.academicYear || '',
          teacherId: c.teacherId?._id || '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await classesApi.update(id, form);
    } else {
      await classesApi.create(form);
    }
    navigate('/classes');
  };

  return (
    <div>
      <div className="page-header"><h1>{isEdit ? 'Edit Class' : 'Add Class'}</h1></div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Section</label>
            <input name="section" value={form.section} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Academic Year</label>
            <input name="academicYear" value={form.academicYear} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Homeroom Teacher</label>
            <select name="teacherId" value={form.teacherId} onChange={handleChange}>
              <option value="">-- Select Teacher --</option>
              {teachers.map((t) => <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            <button type="button" className="btn" style={{ background: '#e0e0e0' }} onClick={() => navigate('/classes')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
