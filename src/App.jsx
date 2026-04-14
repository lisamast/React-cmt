import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import Login from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                <Route path="/tasks/:id" element={
                    <ProtectedRoute>
                        <TaskDetail />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;