const TaskCard = ({ naam, vak, deadline, status }) => {
    return (
        <div>
            <h2>{naam}</h2>
            <p>Vak: {vak}</p>
            <p>Deadline: {deadline}</p>
            <p>Status: {status}</p>
        </div>
  );
};

export default TaskCard;