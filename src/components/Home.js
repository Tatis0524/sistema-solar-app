"use client"
import fondo from "./assets/fondo_inicio.jpeg"
import { useNavigate } from "react-router-dom"
import "./Home.css" // Importamos el archivo CSS

const Home = () => {
  const navigate = useNavigate()

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate("/exploracion")}>
          EXPLORACIÓN DEL SISTEMA SOLAR
        </button>
        <button className="nav-button" onClick={() => navigate("/quiz")}>
          JUEGO DE PREGUNTAS Y RESPUESTAS
        </button>
        <button className="nav-button" onClick={() => navigate("/puzzle")}>
          ROMPECABEZAS DEL SISTEMA SOLAR
        </button>
        <button className="nav-button" onClick={() => navigate("/simulacion")}>
          SIMULACIÓN DEL DÍA Y LA NOCHE
        </button>
      </div>

      <div className="content">
        {/* Nuevo div para el fondo degradado */}
        <div className="content-background"></div>

        <h1 className="title">
          SISTEMA
          <br />
          SOLAR
        </h1>
        <p className="subtitle">Explora las maravillas de nuestro Sistema Solar y sus cuerpos celestes</p>

        <button className="start-button" onClick={() => navigate("/exploracion")}>
          INICIAR EXPLORACIÓN
        </button>
      </div>
    </div>
  )
}

export default Home
