import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./PuzzleGame.css"

const planetNames = [
  "mercurio", "venus", "tierra", "marte", "jupiter",
  "saturno", "urano", "neptuno", "pluton"
]

// Coordenadas alineadas con la imagen solar_template.png
const dropZonePositions = [
  { left: 150, top: 222 },   // Mercurio
  { left: 212, top: 222 },  // Venus
  { left: 275, top: 222 },  // Tierra
  { left: 342, top: 222 },  // Marte
  { left: 435, top: 222 },  // Júpiter
  { left: 560, top: 222 },  // Saturno
  { left: 655, top: 222 },  // Urano
  { left: 730, top: 222 },  // Neptuno
  { left: 800, top: 222 },  // Plutón
]

// Función para desordenar planetas
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const PuzzleGame = () => {
  const navigate = useNavigate()
  const shuffledPlanets = shuffle(planetNames)

  useEffect(() => {
    const planets = document.querySelectorAll(".planet")
    const dropZones = document.querySelectorAll(".drop-zone")

    planets.forEach(planet => {
      planet.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", planet.dataset.planet)
      })
    })

    dropZones.forEach(zone => {
      zone.addEventListener("dragover", e => e.preventDefault())

      zone.addEventListener("drop", e => {
        e.preventDefault()
        const planetName = e.dataTransfer.getData("text/plain")
        const draggedPlanet = document.querySelector(`.planet[data-planet="${planetName}"]`)

        if (zone.children.length > 0) {
          alert("¡Este espacio ya tiene un planeta!")
          return
        }

        if (zone.dataset.planet === planetName) {
          zone.appendChild(draggedPlanet)
          draggedPlanet.style.position = "absolute"
          draggedPlanet.style.top = "0"
          draggedPlanet.style.left = "0"
          draggedPlanet.draggable = false
          zone.style.border = "2px solid lime"
          checkWin()
        } else {
          alert("¡Ese planeta no va ahí!")
        }
      })
    })

    function checkWin() {
      const placed = [...dropZones].filter(zone => zone.children.length > 0)
      if (placed.length === 9) {
        setTimeout(() => {
          alert("🎉 ¡Felicidades! Has completado el sistema solar.")
        }, 200)
      }
    }
  }, [])

  return (
    <div className="container">
      <button className="exit-button" onClick={() => navigate("/")}>← SALIR</button>
      <h1>Arrastra y ubica correctamente los planetas en sus posiciones</h1>

      <div className="puzzle">
        <img src="/assets/solar_template.png" className="template" alt="Sistema Solar" />
        {planetNames.map((name, index) => (
          <div
            key={name}
            className="drop-zone"
            data-planet={name}
            style={dropZonePositions[index]}
          ></div>
        ))}
      </div>

      {shuffledPlanets.map((name, index) => (
        <img
          key={name}
          src={`/assets/${name}.png`}
          className="planet"
          draggable="true"
          data-planet={name}
          alt={name}
          style={{
            position: "absolute",
            top: `${460 + index * 10}px`,
            left: `${60 + index * 80}px`,
          }}
        />
      ))}
    </div>
  )
}

export default PuzzleGame
