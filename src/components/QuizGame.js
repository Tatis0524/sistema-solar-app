"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./QuizGame.css"

// Preguntas de ejemplo sobre el espacio
const questions = [
  {
    id: 1,
    question: "¿Qué planeta es conocido como el Planeta Rojo?",
    options: ["Marte", "Urano", "Venus", "Tierra"],
    correctAnswer: 0,
    image: "/marte_sinfondo.png", // Ajustado a tu estructura de archivos
  },
  {
    id: 2,
    question: "¿Cuál es el planeta más grande del Sistema Solar?",
    options: ["Tierra", "Júpiter", "Saturno", "Neptuno"],
    correctAnswer: 1,
    image: "/jupiter_sinfondo.png",
  },
  {
    id: 3,
    question: "¿Qué planeta tiene anillos muy visibles?",
    options: ["Júpiter", "Urano", "Saturno", "Neptuno"],
    correctAnswer: 2,
    image: "/saturno_sinfondo.png",
  },
  {
    id: 4,
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Mercurio", "Tierra", "Marte"],
    correctAnswer: 1,
    image: "/mercurio_sinfondo.png",
  },
  {
    id: 5,
    question: "¿Qué planeta es conocido como el planeta azul?",
    options: ["Neptuno", "Tierra", "Urano", "Venus"],
    correctAnswer: 1,
    image: "/tierra_sinfondo.png", // Ajustado a tu estructura de archivos
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
          <h1 className="quiz-title">Juego de Preguntas Espaciales</h1>
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
