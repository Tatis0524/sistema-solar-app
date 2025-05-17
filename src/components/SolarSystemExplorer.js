"use client"
import fondo from "./assets/exploracion.png"
import { useNavigate } from "react-router-dom"
import "./SolarSystemExplorer.css"

/*
  Componente que permite explorar los diferentes planetas del sistema solar.
  Al dar clic en un planeta redirige a los detalles sobre este.
*/

const planetas = [
  {
    nombre: "Mercury",
    nombreES: "",
    left: "25.6%",
    top: "54%",
    size: "58px",
  },
  {
    nombre: "Venus",
    nombreES: "",
    left: "32.4%",
    top: "39%",
    size: "110px",
  },
  {
    nombre: "Tierra",
    nombreES: "",
    left: "44.1%",
    top: "45%",
    size: "108px",
  },
  {
    nombre: "Mars",
    nombreES: "",
    left: "52.2%",
    top: "56%",
    size: "82px",
  },
  {
    nombre: "Jupiter",
    nombreES: "",
    left: "62%",
    top: "27.7%",
    size: "230px",
  },
  {
    nombre: "Saturn",
    nombreES: "",
    left: "74%",
    top: "59%",
    size: "132px",
  },
  {
    nombre: "Uranus",
    nombreES: "",
    left: "77.4%",
    top: "24.3%",
    size: "68px",
  },
  {
    nombre: "Neptune",
    nombreES: "",
    left: "88%",
    top: "42.1%",
    size: "88px",
  },
  {
    nombre: "Others",
    nombreES: "Otros",
    left: "83.22%",
    top: "9%",
    size: "55px",
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
        <p><b>Aquí puedes explorar los planetas y aprender sobre ellos:</b> Haz clic sobre alguno cuando quieras</p>
      </div>

      {/* Botón de prueba de conocimientos */}
      <button className="quiz-button" onClick={() => navigate("/quiz")}>
        PRUEBA TUS CONOCIMIENTOS <span className="arrow">→</span>
      </button>
    </div>
  )
}

export default SolarSystemExplorer
