// QuizSection.js (haz lo mismo en los otros con su nombre)
import React from 'react';
import { useNavigate } from "react-router-dom"

const DayNightSimulator = () => {
    const navigate = useNavigate()
    
    return (
        <div className="explorer-container">
            <button className="back-button" onClick={() => navigate("/")}>
            <span className="arrow">←</span> REGRESAR
            </button>

            {/* Título */}
            <div className="title-container">
                <h1 className="explorer-title">
                SIMULACIÓN
                </h1>
            </div>
        </div>
    )
}

export default DayNightSimulator;
