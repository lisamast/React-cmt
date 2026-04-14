import { useParams, Link } from 'react-router-dom';
import tasksData from '../task';

function TaskDetail() {
    const { id } = useParams();

    const savedTasks = localStorage.getItem('tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : tasksData;

    const task = tasks.find((task) => task.id === Number(id));

    if (!task) {
        return (
            <div>
                <h1>Taak niet gevonden</h1>
                <Link to="/">Terug naar dashboard</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{task.name}</h1>
            <p>Vak: {task.vak}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.status}</p>
            <p>Omschrijving: {task.omschrijving}</p>
            <p>Docent: {task.docent}</p>
            <p>Geschatte uren: {task.uren}</p>

            <button onClick={() => window.history.back()}>Terug naar dashboard</button>
        </div>
    );
}

export default TaskDetail;