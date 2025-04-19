"use client"
import fondo from "./assets/exploracion.png"
import { useNavigate } from "react-router-dom"
import "./SolarSystemExplorer.css"

const planetas = [
  {
    nombre: "Mercury",
    nombreES: "Mercurio",
    left: "25.7%",
    top: "54.5%",
    size: "74px",
  },
  {
    nombre: "Venus",
    nombreES: "Venus",
    left: "32.3%",
    top: "40%",
    size: "136px",
  },
  {
    nombre: "Tierra",
    nombreES: "Tierra",
    left: "44.1%",
    top: "46%",
    size: "134px",
  },
  {
    nombre: "Mars",
    nombreES: "Marte",
    left: "52.2%",
    top: "56.2%",
    size: "104px",
  },
  {
    nombre: "Jupiter",
    nombreES: "Júpiter",
    left: "62%",
    top: "29%",
    size: "287px",
  },
  {
    nombre: "Saturn",
    nombreES: "Saturno",
    left: "74%",
    top: "59.4%",
    size: "169px",
  },
  {
    nombre: "Uranus",
    nombreES: "Urano",
    left: "77.4%",
    top: "26%",
    size: "85px",
  },
  {
    nombre: "Neptune",
    nombreES: "Neptuno",
    left: "87.9%",
    top: "43.3%",
    size: "108px",
  },
  {
    nombre: "Others",
    nombreES: "Otros",
    left: "83.22%",
    top: "10%",
    size: "62px",
  },
]

const SolarSystemExplorer = () => {
  const navigate = useNavigate()

  return (
    <div className="explorer-container" style={{ backgroundImage: `url(${fondo})` }}>
      {/* Botón de regreso */}
      <button className="back-button" onClick={() => navigate("/")}>
        <span className="arrow">←</span> REGRESAR
      </button>

      {/* Título */}
      <div className="title-container">
        <h1 className="explorer-title">
          Sistema
          <br />
          Solar
        </h1>
      </div>

      {/* Planetas interactivos */}
      {planetas.map((planeta, i) => (
        <div
          key={i}
          className="planeta-container"
          style={{
            left: planeta.left,
            top: planeta.top,
          }}
        >
          <button
            className="planeta-button"
            style={{ width: planeta.size, height: planeta.size }}
            onClick={() => navigate(`/planeta/${planeta.nombre.toLowerCase()}`)}
            aria-label={`Ver detalles de ${planeta.nombreES}`}
          >
            <span className="planeta-hover-effect"></span>
          </button>
          <span className="planeta-nombre">{planeta.nombreES}</span>
        </div>
      ))}

      {/* Texto informativo */}
      <div className="info-text">
        <span className="audio-icon">🔊</span>
        Aquí puedes explorar los planetas y aprender sobre ellos
      </div>

      {/* Botón de prueba de conocimientos */}
      <button className="quiz-button" onClick={() => navigate("/quiz")}>
        PRUEBA TUS CONOCIMIENTOS <span className="arrow">→</span>
      </button>
    </div>
  )
}

export default SolarSystemExplorer
