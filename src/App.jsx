import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import tasksData from './task';
import './App.css';

import { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : tasksData;
    });
    const [activeFilter, setActiveFilter] = useState('alles');

    const [formData, setFormData] = useState({
        title: "",
        vak: "",
        deadline: "",
        omschrijving: "",
        docent: "",
        uren: "",
    });
    const [apiTasks, setApiTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Er ging iets mis.");
                }
                return response.json();
            })
            .then((data) => {
                setApiTasks(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const toggleTaskStatus = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status: task.status === "Afgerond" ? "Nog niet klaar" : "Afgerond"
                    }
                    : task
            )
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddTask = (e) => {
        e.preventDefault();

        if (formData.title.trim() === "") {
            setError("Vul een title in.");
            return;
        }

        if (formData.vak.trim() === "") {
            setError("Vul een vak in.");
            return;
        }

        if (formData.deadline.trim() === "") {
            setError("Vul een deadline in.");
            return;
        }

        if (formData.docent.trim() === "") {
            setError("Vul een docent in.");
            return;
        }

        setError("");

        const newTaskObject = {
            id: Date.now(),
            name: formData.title,
            vak: formData.vak,
            deadline: formData.deadline,
            status: "Nog niet klaar",
            omschrijving: "Nog geen omschrijving",
            docent: formData.docent,
            uren: formData.uren,
        };

        setTasks([...tasks, newTaskObject]);

        setFormData({
            title: "",
            vak: "",
            deadline: "",
            omschrijving: "",
            docent: "",
            uren: "",
        });
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            activeFilter === "alles" ||
            (activeFilter === "te-doen" && task.status === "Nog niet klaar") ||
            (activeFilter === "afgerond" && task.status === "Afgerond");

        const matchesSearch = task.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === "true";
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <div>
            <div className={darkMode ? "dark" : ""}>
                <Header />
                <Sidebar />

                <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "Light mode" : "Dark mode"}
                </button>

                <input
                    type="text"
                    placeholder="Zoek een taak"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div>
                    <button
                        className={activeFilter === "alles" ? "active-filter" : ""}
                        onClick={() => setActiveFilter("alles")}
                    >
                        Alles
                    </button>

                    <button
                        className={activeFilter === "te-doen" ? "active-filter" : ""}
                        onClick={() => setActiveFilter("te-doen")}
                    >
                        Te doen
                    </button>

                    <button
                        className={activeFilter === "afgerond" ? "active-filter" : ""}
                        onClick={() => setActiveFilter("afgerond")}
                    >
                        Afgerond
                    </button>
                </div>

                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Taak"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="vak"
                        placeholder="Vak"
                        value={formData.vak}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="deadline"
                        placeholder="Deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="omschrijving"
                        placeholder="Omschrijving"
                        value={formData.omschrijving}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="docent"
                        placeholder="Docent"
                        value={formData.docent}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="uren"
                        placeholder="Aantal uren"
                        value={formData.uren}
                        onChange={handleChange}
                    />

                    <button type="submit">Toevoegen</button>
                </form>

                {error && <p>{error}</p>}


                {/* {newTask && <p>Nieuwe taak: {newTask}</p>} */}

                {filteredTasks.length === 0 ? (
                    <p>Geen taken gevonden.</p>
                ) : (

                    <div>
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                id={task.id}
                                name={task.name}
                                vak={task.vak}
                                deadline={task.deadline}
                                status={task.status}
                                omschrijving={task.omschrijving}
                                docent={task.docent}
                                uren={task.uren}
                                onToggleStatus={toggleTaskStatus}
                            />
                        ))}
                    </div>
                )}

                <div>
                    <h2>Voorbeeldtaken uit API</h2>

                    {loading && <p>Laden...</p>}

                    {error && <p>{error}</p>}

                    {!loading && !error && apiTasks.length === 0 && <p>Geen voorbeeldtaken gevonden</p>}

                    {!loading && !error && apiTasks.length > 0 && (
                        <div>
                            {apiTasks.map((item) => (
                                <div key={item.id}>
                                    <p>Titel: {item.title}</p>
                                    <p>Status: {item.completed ? "Afgerond" : "Nog te doen"}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div >
        </div>
    );
}

export default App;