import React, { useState, useRef } from "react";
import styled from "styled-components";

import quotes from "../quotes";
import QuizStart from "./QuizStart";

let terms = quotes.quotes;
let data = [];

const MatchingWrapper = styled.div`
  margin: 0 auto;
  display: block;
  width: 50%:
`;

export default function FillInBlankQuiz({ items }) {
  const [questions, setQuestions] = useState(new Array(10).fill(""));
  
  const [examStarted, setStartExam] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const ref = useRef();

  function setupQuiz(num) {
    if (!isNaN(num)) {
      for (let i = 0; i < num; i++) {
        data.push(terms[Math.floor(Math.random() * terms.length)]);
      }
      console.log(data);
      setQuestions(new Array(num).fill(""));
      setStartExam(true);
      return;
    }
  }

  function setAnswer(e) {
    let array = [...questions];
    array[e.target.id] = e.target.value;
    setQuestions([...array]);
  }

  function submitExam() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].toLowerCase() === data[i].author.toLowerCase()) {
        score++;
      }
    }
    setExamSubmitted(true);
    setScore(score);
  }

  function getGrade() {
    let num = score / questions.length * 100 || 0;
    console.log(num);
    if (num < 60) {
      return "F";
    } else if (num < 70) {
      return "D";
    } else if (num < 80) {
      return "C";
    } else if (num < 90) {
      return "B";
    } else {
      return "A";
    }
  }

  return (
    <MatchingWrapper>
      {examStarted ? (
        <div>
          <ul>
            {data.map((value, key) => {
              return (
                <li key={key}>
                  <p>{value.quote} </p>
                  <input type="text" onChange={setAnswer} id={key} />
                </li>
              );
            })}
          </ul>
          {examSubmitted ? (
            <h1>
              You scored {score} out of {questions.length}, Grade {getGrade()}
            </h1>
          ) : null}

          <button onClick={submitExam}>Submit Exam</button>
          <button
            onClick={() => {
              let confirm = window.confirm("Are you sure you'd like to reset?");
              if (confirm) {
              } else {
                return
              }
              setExamSubmitted(false);
              setStartExam(false);
            }}
          >
            Reset Exam
          </button>
        </div>
      ) : (
        <QuizStart setupQuiz={setupQuiz} />
      )}
    </MatchingWrapper>
  );
}
