const BASE_URL = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const studentsApi = {
  getAll: () => request('/students'),
  getById: (id) => request(`/students/${id}`),
  create: (data) => request('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/students/${id}`, { method: 'DELETE' }),
};

export const teachersApi = {
  getAll: () => request('/teachers'),
  getById: (id) => request(`/teachers/${id}`),
  create: (data) => request('/teachers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/teachers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/teachers/${id}`, { method: 'DELETE' }),
};

export const classesApi = {
  getAll: () => request('/classes'),
  getById: (id) => request(`/classes/${id}`),
  create: (data) => request('/classes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/classes/${id}`, { method: 'DELETE' }),
};

export const coursesApi = {
  getAll: () => request('/courses'),
  getById: (id) => request(`/courses/${id}`),
  create: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
};

export const gradesApi = {
  getAll: () => request('/grades'),
  getById: (id) => request(`/grades/${id}`),
  getByStudent: (studentId) => request(`/grades/student/${studentId}`),
  create: (data) => request('/grades', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/grades/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/grades/${id}`, { method: 'DELETE' }),
};

export const attendanceApi = {
  getAll: () => request('/attendance'),
  getById: (id) => request(`/attendance/${id}`),
  getByStudent: (studentId) => request(`/attendance/student/${studentId}`),
  getByCourse: (courseId) => request(`/attendance/course/${courseId}`),
  create: (data) => request('/attendance', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/attendance/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/attendance/${id}`, { method: 'DELETE' }),
};
