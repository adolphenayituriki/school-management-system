import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>School Manager</h2>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/teachers">Teachers</NavLink>
          <NavLink to="/classes">Classes</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/grades">Grades</NavLink>
          <NavLink to="/attendance">Attendance</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
