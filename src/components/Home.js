"use client"
import fondo from "./assets/fondo_inicio.jpeg"
import { useNavigate } from "react-router-dom"
import "./Home.css"

/*
  Componente principal del menú de inicio de la aplicación educativa.
  Muestra el título y los accesos a las diferentes secciones: exploración, juego y detalles.
*/
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
        {/* fondo degradado */}
        <div className="content-background"></div>

        <h1 className="title">
          EXPLORA EL
          <br />
          SISTEMA SOLAR
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
