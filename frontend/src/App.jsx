import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import TeacherList from './components/TeacherList';
import TeacherForm from './components/TeacherForm';
import ClassList from './components/ClassList';
import ClassForm from './components/ClassForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import GradeList from './components/GradeList';
import GradeForm from './components/GradeForm';
import AttendanceList from './components/AttendanceList';
import AttendanceForm from './components/AttendanceForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/new" element={<StudentForm />} />
          <Route path="students/edit/:id" element={<StudentForm />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="teachers/new" element={<TeacherForm />} />
          <Route path="teachers/edit/:id" element={<TeacherForm />} />
          <Route path="classes" element={<ClassList />} />
          <Route path="classes/new" element={<ClassForm />} />
          <Route path="classes/edit/:id" element={<ClassForm />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/new" element={<CourseForm />} />
          <Route path="courses/edit/:id" element={<CourseForm />} />
          <Route path="grades" element={<GradeList />} />
          <Route path="grades/new" element={<GradeForm />} />
          <Route path="grades/edit/:id" element={<GradeForm />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="attendance/new" element={<AttendanceForm />} />
          <Route path="attendance/edit/:id" element={<AttendanceForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
