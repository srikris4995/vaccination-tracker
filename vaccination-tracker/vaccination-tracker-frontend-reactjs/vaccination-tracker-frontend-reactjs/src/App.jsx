import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListStudentComponents from './components/ListStudentComponent'
import { BrowserRouter, Route, Routes,useLocation   } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import LoginComponent from './components/LoginComponent'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardComponent from './components/DashboardComponent/DashboardComponent'
import HomeComponent from './components/HomeComponent'
import ReportComponent from './components/ReportComponent'

function App() {

  return (
    <BrowserRouter>
    <Main />
    </BrowserRouter>
  );
}

function Main(){
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return(
    <>
    {!isLoginPage && <HeaderComponent />}
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/Home" element={<HomeComponent />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardComponent /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><ListStudentComponents /></ProtectedRoute>} />
      <Route path="/add-students" element={<ProtectedRoute><StudentComponent /></ProtectedRoute>} />
      <Route path="/update-students/:id" element={<ProtectedRoute><StudentComponent /></ProtectedRoute>} />
      <Route path="/students/:id" element={<ProtectedRoute><StudentComponent /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportComponent /></ProtectedRoute>} />
      </Routes>

      {!isLoginPage && <FooterComponent />}
    </>
    
  )
}

export default App
