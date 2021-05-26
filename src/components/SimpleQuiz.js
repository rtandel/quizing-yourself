import React, { useState } from "react";
import styled from "styled-components";
import quotes from "../quotes";

let terms = quotes.quotes;

const QuizWrapper = styled.div`
  height: 250px;
  margin: 0 auto;
  padding: 1em;
  border: 4px solid black;
  text-align: center;

  & .flip-card {
    background-color: transparent;
    height: 150px;
    border: 1px solid #f1f1f1;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  & .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}

`;

export default function SimpleQuiz() {
  const [questions, getQuestions] = useState(terms);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  function nextQuestion(e) {
    let num = selectedQuestion + 1;
    if (num >= questions.length) {
      setSelectedQuestion(0);
      return;
    }
    setSelectedQuestion(num);
  }

  function previousQuestion(e) {
    let num = selectedQuestion - 1;
    if (num < 0) {
      setSelectedQuestion(questions.length - 1);
      return;
    }
    setSelectedQuestion(num);
  }

  return (
    <QuizWrapper>
      <h1>Note Cards</h1>
      <div className="flip-card">
        <div className="flip-card-inner">
          {console.log(questions[selectedQuestion])}
          <div className="flip-card-front">
            <p>{questions[selectedQuestion].quote}</p>
          </div>
          <div className="flip-card-back">
            <p>{questions[selectedQuestion].author}</p>
          </div>
        </div>
      </div>

      <button onClick={previousQuestion}>Previous</button>
      <button onClick={nextQuestion}>Next</button>
    </QuizWrapper>
  );
}
