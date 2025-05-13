import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./PuzzleGame.css"

const planetNames = [
  "mercurio", "venus", "tierra", "marte", "jupiter",
  "saturno", "urano", "neptuno"
]

// Coordenadas alineadas con la imagen solar_template.png
const dropZonePositions = [
  { left: 250, top: 343 },   // Mercurio
  { left: 325, top: 341 },   // Venus
  { left: 422, top: 341 },   // Tierra
  { left: 515, top: 343 },   // Marte
  { left: 647, top: 340 },   // Júpiter
  { left: 819, top: 340 },   // Saturno
  { left: 961, top: 341 },   // Urano
  { left: 1069, top: 338 },   // Neptuno
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
  const audioCorrect = new Audio('assets/correct.mp3');
  const audioWrong = new Audio('assets/wrong.mp3');

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
          audioCorrect.play();
          return
        }

        if (zone.dataset.planet === planetName) {
          zone.appendChild(draggedPlanet)
          draggedPlanet.style.position = "absolute"
          draggedPlanet.style.top = "0"
          draggedPlanet.style.left = "0"
          draggedPlanet.draggable = false
          checkWin()
        } else {
          audioWrong.play();
        }
      })
    })

    function checkWin() {
      const placed = [...dropZones].filter(zone => zone.children.length > 0)
      if (placed.length === 8) {
        setTimeout(() => {
          alert("🎉 ¡Felicidades! Has completado el sistema solar.")
        }, 200)
      }
    }
  }, [])

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>← REGRESAR</button>
      <h1>Arrastra y ubica correctamente los planetas en sus posiciones</h1>

      <div className="puzzle">
        <img src="/assets/solar_template.png" className="template" alt="Sistema Solar" />
        {planetNames.map((name, index) => {
          const planetSizes = {
            mercurio: 35,
            venus: 75,
            tierra: 80,
            marte: 70,
            jupiter: 150,
            saturno: 207,
            urano: 92,
            neptuno: 80,
          }

          return (
            <div
              key={name}
              className="drop-zone"
              data-planet={name}
              style={{
                ...dropZonePositions[index],
                width: `${planetSizes[name]}px`,
                height: `${planetSizes[name]}px`,
                marginLeft: `-${planetSizes[name] / 2}px`,
                marginTop: `-${planetSizes[name] / 2}px`,
              }}
            ></div>
          )
        })}
      </div>

      {shuffledPlanets.map((name, index) => {
        const isLeft = index % 2 === 0
        const sideClass = isLeft ? "planet-left" : "planet-right"
        const verticalPos = 100 + index * 100
        const planetImageSizes = {
          mercurio: 35,
          venus: 75,
          tierra: 80,
          marte: 70,
          jupiter: 150,
          saturno: 207,
          urano: 92,
          neptuno: 80,
        }

        return (
          <img
            key={name}
            src={`/assets/${name}.png`}
            className={`planet ${sideClass}`}
            draggable="true"
            data-planet={name}
            alt={name}
            style={{ top: `${verticalPos}px`,
                    width: `${planetImageSizes[name]}px`,
                    height: `${planetImageSizes[name]}px`
            }}
          />
        )
      })}
    </div>
  )
}

export default PuzzleGame
