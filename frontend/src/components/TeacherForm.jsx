import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { teachersApi } from '../api';

export default function TeacherForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', gender: 'Male', address: '', specialization: '' });

  useEffect(() => {
    if (isEdit) {
      teachersApi.getById(id).then((t) => {
        setForm({
          firstName: t.firstName || '',
          lastName: t.lastName || '',
          email: t.email || '',
          phone: t.phone || '',
          gender: t.gender || 'Male',
          address: t.address || '',
          specialization: t.specialization || '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await teachersApi.update(id, form);
    } else {
      await teachersApi.create(form);
    }
    navigate('/teachers');
  };

  return (
    <div>
      <div className="page-header"><h1>{isEdit ? 'Edit Teacher' : 'Add Teacher'}</h1></div>
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
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
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
            <label>Specialization</label>
            <input name="specialization" value={form.specialization} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            <button type="button" className="btn" style={{ background: '#e0e0e0' }} onClick={() => navigate('/teachers')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
