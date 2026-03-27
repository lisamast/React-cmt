import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <Sidebar />
            <TaskCard naam="React presentatie" vak="Frontend" deadline="15 juni" status="Nog niet klaar" />
            <TaskCard naam="Database ontwerp" vak="Backend" deadline="20 juni" status="Afgerond" />
            <TaskCard naam="UI prototype" vak="Design" deadline="22 juni" status="Nog niet klaar" />
        </div>
    );
}

export default App;