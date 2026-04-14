import { useState } from "react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleSidebar}>
                {isOpen ? "Sluit zijpaneel" : "Open zijpaneel"}
            </button>

            {isOpen && (
                <div className="sidebar-panel">
                    <h2>Extra informatie</h2>
                    <p>Naam: Jan</p>
                    <p>Open taken: 3</p>
                    <p>Tip: Werk eerst aan je belangrijkste taak.</p>
                </div>
            )}
        </div>
    );
}

export default Sidebar;