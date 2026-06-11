import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studentsApi, classesApi } from '../api';

export default function StudentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', dateOfBirth: '', gender: 'Male', address: '', phone: '', classId: '' });

  useEffect(() => {
    classesApi.getAll().then(setClasses);
    if (isEdit) {
      studentsApi.getById(id).then((s) => {
        setForm({
          firstName: s.firstName || '',
          lastName: s.lastName || '',
          email: s.email || '',
          dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split('T')[0] : '',
          gender: s.gender || 'Male',
          address: s.address || '',
          phone: s.phone || '',
          classId: s.classId?._id || '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await studentsApi.update(id, form);
    } else {
      await studentsApi.create(form);
    }
    navigate('/students');
  };

  return (
    <div>
      <div className="page-header"><h1>{isEdit ? 'Edit Student' : 'Add Student'}</h1></div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
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
            <button type="button" className="btn" style={{ background: '#e0e0e0' }} onClick={() => navigate('/students')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
