import { useState } from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ id, name, vak, deadline, status, omschrijving, docent, uren, onToggleStatus }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div>
            <Link to={`/tasks/${id}`}>
                <h2>{name}</h2>
            </Link>

            <p>Vak: {vak}</p>
            <p>Deadline: {deadline}</p>
            <p>Status: {status}</p>

            <button onClick={() => onToggleStatus(id)}>
                {status === "Afgerond" ? "Nog niet klaar" : "Afgerond"}
            </button>

            <button onClick={toggleDetails}>
                {showDetails ? "Verberg details" : "Toon details"}
            </button>

            {showDetails && (
                <div>
                    <p>Omschrijving: {omschrijving}</p>
                    <p>Docent: {docent}</p>
                    <p>Geschatte uren: {uren}</p>
                </div>
            )}
        </div>
    );
};

export default TaskCard;