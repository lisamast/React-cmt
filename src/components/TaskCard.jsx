import { useState } from "react";

const TaskCard = ({ name, vak, deadline, status, omschrijving, docent, uren, onToggleStatus, id }) => {
    // const [isCompleted, setIsCompleted] = useState(status === "Afgerond");
    const [showDetails, setShowDetails] = useState(false);

    // const toggleStatus = () => {
    //     setIsCompleted(!isCompleted);
    // };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div>
            <h2>{name}</h2>
            <p>Vak: {vak}</p>
            <p>Deadline: {deadline}</p>
            <p>Status: {status}</p>
            {/* <p>Status: {isCompleted ? "Afgerond" : "Nog niet klaar"}</p> */}

            <button onClick={() => onToggleStatus(id)}>
                {status === "Afgerond" ? "Nog niet klaar" : "Afgerond"}
                {/* {isCompleted ? "Nog niet klaar" : "Afgerond"} */}
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