import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './DayNightSimulator.css';

/*
  Componente que muestra una simulación del como la tierra va pasando por el día y la noche.
  Incluye como van pasando las fases de la luna a lo largo del día y una descripción del sol, la tierra y la luna.
*/

const DayNightSimulator = () => {
    const navigate = useNavigate();
    const [timeOfDay, setTimeOfDay] = useState('day');
    const [moonPhaseIndex, setMoonPhaseIndex] = useState(4); // Comienza con luna llena
    const [rotation, setRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const [showInfo, setShowInfo] = useState('');
    const animationRef = useRef(null);
    
    const moonPhases = [
        { name: 'nueva', icon: '🌑', angle: 0 },
        { name: 'creciente', icon: '🌒', angle: 45 },
        { name: 'cuarto creciente', icon: '🌓', angle: 90 },
        { name: 'gibosa creciente', icon: '🌔', angle: 135 },
        { name: 'llena', icon: '🌕', angle: 180 },
        { name: 'gibosa menguante', icon: '🌖', angle: 225 },
        { name: 'cuarto menguante', icon: '🌗', angle: 270 },
        { name: 'creciente menguante', icon: '🌘', angle: 315 }
    ];

    const currentMoonPhase = moonPhases[moonPhaseIndex];

    const startRotation = () => {
        if (isRotating) return;
        
        setIsRotating(true);
        let startTime = null;
        const duration = 10000; // 10 segundos para una rotación completa
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            
            if (progress < 1) {
                setRotation(progress * 360);
                animationRef.current = requestAnimationFrame(animate);
                
                // Actualizar fase lunar cada 45 grados
                const newMoonIndex = Math.floor((progress * 8) % 8);
                setMoonPhaseIndex(newMoonIndex);
                
                // Cambiar entre día y noche
                setTimeOfDay(progress % 0.5 < 0.25 ? 'day' : 'night');
            } else {
                setIsRotating(false);
                setRotation(0);
            }
        };
        
        animationRef.current = requestAnimationFrame(animate);
    };

    const stopRotation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            setIsRotating(false);
        }
    };

    const changeMoonPhase = (direction) => {
        let newIndex = direction === 'next' ? moonPhaseIndex + 1 : moonPhaseIndex - 1;
        
        if (newIndex >= moonPhases.length) newIndex = 0;
        if (newIndex < 0) newIndex = moonPhases.length - 1;
        
        setMoonPhaseIndex(newIndex);
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div className={`simulator-container ${timeOfDay}`}>
            <button className="back-button" onClick={() => navigate("/")}>
                <span className="arrow">←</span> REGRESAR
            </button>

            <div className="title-container">
                <h1 className="simulator-title">SIMULACIÓN DEL DÍA Y LA NOCHE</h1>
                <p className="subtitle">Aprende cómo funciona nuestro planeta</p>
                <p className="subtitle">Para saber más presiona la luna y la tierra</p>
            </div>

            <div className="simulation-area">
                {/* Sol */}
                <div className="sun"></div>
                
                {/* Tierra */}
                <div 
                    className="earth" 
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={() => setShowInfo(showInfo === 'earth' ? '' : 'earth')}
                >
                    <div className={`day-night ${timeOfDay}`}></div>
                    
                    {/* Luna */}
                    <div 
                        className="moon-orbit"
                        style={{ transform: `rotate(${currentMoonPhase.angle}deg)` }}
                    >
                        <div 
                            className={`moon ${currentMoonPhase.name}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowInfo(showInfo === 'moon' ? '' : 'moon');
                            }}
                        ></div>
                    </div>
                </div>
                
                {/* Estrellas (solo visibles de noche) */}
                <div className="stars"></div>
            </div>

            <div className="controls">
                <button 
                    onClick={isRotating ? stopRotation : startRotation}
                    className="control-button"
                >
                    {isRotating ? '⏸ Detener' : '▶️ Rotar Tierra'}
                </button>
                
                <div className="moon-controls">
                    <button 
                        onClick={() => changeMoonPhase('prev')}
                        className="control-button"
                    >
                        ◀️ Luna anterior
                    </button>
                    
                    <span className="moon-phase">
                        {currentMoonPhase.icon} {currentMoonPhase.name}
                    </span>
                    
                    <button 
                        onClick={() => changeMoonPhase('next')}
                        className="control-button"
                    >
                        Luna siguiente ▶️
                    </button>
                </div>
            </div>

            {/* Información educativa */}
            <div className="info-panels">
                {showInfo === 'earth' && (
                    <div className="info-panel earth-info">
                        <h3>🌍 La Tierra</h3>
                        <p>
                            La Tierra gira sobre su propio eje (rotación) cada 24 horas, 
                            causando el ciclo de día y noche.
                        </p>
                        <p>
                            La parte que mira al Sol es de día, y la parte opuesta es de noche.
                        </p>
                        <button 
                            className="close-info"
                            onClick={() => setShowInfo('')}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
                
                {showInfo === 'moon' && (
                    <div className="info-panel moon-info">
                        <h3>🌕 La Luna</h3>
                        <p>
                            La Luna orbita alrededor de la Tierra aproximadamente cada 28 días.
                        </p>
                        <p>
                            Las fases lunares dependen de cuánta parte iluminada por el Sol podemos ver.
                        </p>
                        <ul className="moon-phases-list">
                            {moonPhases.map((phase, index) => (
                                <li key={phase.name} className={moonPhaseIndex === index ? 'active' : ''}>
                                    {phase.icon} {phase.name}
                                </li>
                            ))}
                        </ul>
                        <button 
                            className="close-info"
                            onClick={() => setShowInfo('')}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
                
                {showInfo === 'sun' && (
                    <div className="info-panel sun-info">
                        <h3>☀️ El Sol</h3>
                        <p>
                            El Sol es una estrella que proporciona luz y calor a la Tierra.
                        </p>
                        <p>
                            Aunque parece moverse por el cielo, en realidad es la Tierra la que se mueve.
                        </p>
                        <button 
                            className="close-info"
                            onClick={() => setShowInfo('')}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
            
            {/* Botón para información sobre el sol */}
            <button 
                className="sun-info-button"
                onClick={() => setShowInfo(showInfo === 'sun' ? '' : 'sun')}
            >
                ☀️ Saber más sobre el Sol
            </button>
        </div>
    );
};

export default DayNightSimulator;