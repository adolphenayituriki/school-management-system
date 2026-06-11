import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentsApi, teachersApi, classesApi, coursesApi, gradesApi, attendanceApi } from '../api';

export default function Dashboard() {
  const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0, courses: 0, grades: 0, attendance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      studentsApi.getAll(),
      teachersApi.getAll(),
      classesApi.getAll(),
      coursesApi.getAll(),
      gradesApi.getAll(),
      attendanceApi.getAll(),
    ]).then(([students, teachers, classes, courses, grades, attendance]) => {
      setCounts({
        students: students.length,
        teachers: teachers.length,
        classes: classes.length,
        courses: courses.length,
        grades: grades.length,
        attendance: attendance.length,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header"><h1>Dashboard</h1></div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Students</h3>
          <div className="count">{counts.students}</div>
          <Link to="/students">View all</Link>
        </div>
        <div className="dashboard-card">
          <h3>Teachers</h3>
          <div className="count">{counts.teachers}</div>
          <Link to="/teachers">View all</Link>
        </div>
        <div className="dashboard-card">
          <h3>Classes</h3>
          <div className="count">{counts.classes}</div>
          <Link to="/classes">View all</Link>
        </div>
        <div className="dashboard-card">
          <h3>Courses</h3>
          <div className="count">{counts.courses}</div>
          <Link to="/courses">View all</Link>
        </div>
        <div className="dashboard-card">
          <h3>Grades</h3>
          <div className="count">{counts.grades}</div>
          <Link to="/grades">View all</Link>
        </div>
        <div className="dashboard-card">
          <h3>Attendance</h3>
          <div className="count">{counts.attendance}</div>
          <Link to="/attendance">View all</Link>
        </div>
      </div>
    </div>
  );
}
