"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import marte from "./assets/martep.jpg"
import jupiter from "./assets/jupiterp.jpg"
import jupiterp from "./assets/jupiterpunto.jpg"
import saturno from "./assets/saturnop.jpg"
import mercurio from "./assets/mercuriop.jpg"
import tierra from "./assets/tierrap.jpg"
import todos from "./assets/todos.png"
import urano from "./assets/uranop.png"
import neptuno from "./assets/neptunop.png"
import "./QuizGame.css"

// Preguntas sobre el sistema solar
const questions = [
  {
    id: 1,
    question: "¿Qué planeta es conocido como el Planeta Rojo?",
    options: ["Marte", "Urano", "Venus", "Tierra"],
    correctAnswer: 0,
    image: marte,
  },
  {
    id: 2,
    question: "¿Cuál es el planeta más grande del Sistema Solar?",
    options: ["Tierra", "Júpiter", "Saturno", "Neptuno"],
    correctAnswer: 1,
    image: jupiter,
  },
  {
    id: 3,
    question: "¿Qué planeta tiene anillos muy visibles?",
    options: ["Júpiter", "Urano", "Saturno", "Neptuno"],
    correctAnswer: 2,
    image: saturno,
  },
  {
    id: 4,
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Mercurio", "Tierra", "Marte"],
    correctAnswer: 1,
    image: mercurio,
  },
  {
    id: 5,
    question: "¿Qué planeta es conocido como el planeta azul?",
    options: ["Neptuno", "Tierra", "Urano", "Venus"],
    correctAnswer: 1,
    image: tierra,
  },
  {
    id: 6,
    question: "¿Cuántos planetas tiene el Sistema Solar?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    image: todos,
  },
  {
    id: 7,
    question: "¿Cuál es el planeta más frío del Sistema Solar?",
    options: ["Mercurio", "Venus", "Urano", "Marte"],
    correctAnswer: 2,
    image: urano,
  },
  {
    id: 8,
    question: "¿Qué planeta tiene un gran punto rojo que es una tormenta?",
    options: ["Saturno", "Marte", "Neptuno", "Júpiter"],
    correctAnswer: 3,
    image: jupiterp,
  },
  {
    id: 9,
    question: "¿Qué planeta tiene muchos anillos, pero no se ven fácilmente como los de Saturno?",
    options: ["Urano", "Mercurio", "Venus", "Marte"],
    correctAnswer: 0,
    image: urano,
  },
  {
    id: 10,
    question: "¿Qué planeta tiene un color azul intenso y vientos muy fuertes?",
    options: ["Venus", "Neptuno", "Saturno", "Marte"],
    correctAnswer: 1,
    image: neptuno,
  },
]

function QuizGame() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex)

    const correct = optionIndex === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 10)
    }

    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
      setSelectedOption(null)
      setIsCorrect(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
  }

  const exitQuiz = () => {
    navigate("/")
  }

  return (
    <div className="quiz-container">
      <button className="back-button" onClick={() => navigate("/")}>
            <span className="arrow">←</span> REGRESAR
      </button>
      {!gameStarted ? (
        <div className="quiz-start-screen">
          <h1 className="quiz-title">Juego de Preguntas Del Sistema Solar</h1>
          <button className="quiz-start-button" onClick={() => setGameStarted(true)}>
            ¡COMENZAR!
          </button>
        </div>
      ) : !showResult ? (
        <div className="quiz-question-container">
          {/* Botón de salir */}
          <button className="quiz-exit-button" onClick={exitQuiz}>
            <span className="arrow">←</span> SALIR
          </button>

          {/* Panel principal */}
          <div className="quiz-panel">
            {/* Estrellas decorativas */}
            <div className="star-decoration star-left">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="star-decoration star-right">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>

            {/* Pregunta */}
            <h2 className="quiz-question">{questions[currentQuestion].question}</h2>

            {/* Imagen del planeta */}
            <div className="planet-image-container">
              <div className="planet-image-circle">
                <img
                  src={questions[currentQuestion].image || "/placeholder.svg"}
                  alt="Planeta"
                  className="planet-image"
                />
              </div>
            </div>

            {/* Opciones */}
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    selectedOption === null
                      ? ""
                      : selectedOption === index
                        ? isCorrect
                          ? "correct"
                          : "incorrect"
                        : "disabled"
                  }`}
                  onClick={() => selectedOption === null && handleAnswer(index)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Mensaje de retroalimentación */}
            {isCorrect !== null && (
              <div className={`feedback-message ${isCorrect ? "correct-feedback" : "incorrect-feedback"}`}>
                {isCorrect
                  ? "¡Correcto! ¡Ganaste 10 puntos!"
                  : `Incorrecto. La respuesta correcta es: ${
                      questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
                    }`}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-result-panel">
          <h1 className="result-title">¡Juego Terminado!</h1>
          <p className="result-text">Tu puntuación final:</p>
          <p className="result-score">{score} puntos</p>

          <div className="result-buttons">
            <button onClick={resetQuiz} className="play-again-button">
              Jugar de nuevo
            </button>
            <button onClick={exitQuiz} className="exit-button">
              Salir
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizGame
