import './App.css'
import FooterComponent from './components/FooterComponent/FooterComponent.jsx'
import HeaderComponent from './components/HeaderComponent/HeaderComponent.jsx'
import ListStudentComponents from './components/ListStudentComponent/ListStudentComponent.jsx'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import LoginComponent from './components/LoginComponent/LoginComponent.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardComponent from './components/DashboardComponent/DashboardComponent'
import HomeComponent from './components/HomeComponent/HomeComponent'
import ReportComponent from './components/ReportComponent/ReportComponent.jsx'
import PrivateRoute from "./components/PrivateRoute.jsx";
import RegisterComponent  from "./components/RegisterComponent/RegisterComponent.jsx";

function App() {

    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
}

function Main() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/" || location.pathname === "/register";
    return (
        <>
            {!isLoginPage && <HeaderComponent/>}
            <Routes>
                <Route path="/" element={<LoginComponent/>}/>
                <Route path="/register" element={<RegisterComponent />} />

                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="/Home" element={<HomeComponent/>}/>
                                <Route path="/dashboard"
                                       element={<ProtectedRoute><DashboardComponent/></ProtectedRoute>}/>
                                <Route path="/students"
                                       element={<ProtectedRoute><ListStudentComponents/></ProtectedRoute>}/>
                                <Route path="/add-students"
                                       element={<ProtectedRoute><StudentComponent/></ProtectedRoute>}/>
                                <Route path="/update-students/:id"
                                       element={<ProtectedRoute><StudentComponent/></ProtectedRoute>}/>
                                <Route path="/students/:id"
                                       element={<ProtectedRoute><StudentComponent/></ProtectedRoute>}/>
                                <Route path="/reports" element={<ProtectedRoute><ReportComponent/></ProtectedRoute>}/>
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {!isLoginPage && <FooterComponent/>}
        </>

    )
}

export default App
