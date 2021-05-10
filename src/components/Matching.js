import React, { useState, useRef } from "react";
import styled from "styled-components";

import quotes from "../quotes";

let terms = quotes.quotes;
let data = [];
let answerKey = [];

const MatchingWrapper = styled.div``;

export default function Matching({ items }) {
  const [questions, setQuestions] = useState(new Array(10).fill(""));
  const [answerChoices, setAnswerChoices] = useState([]);
  const [examStarted, setStartExam] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const ref = useRef();

  function setupQuiz() {
    let num = Number.parseInt(ref.current.value);

    if (!isNaN(num)) {
      for (let i = 0; i < num; i++) {
        data.push(terms[Math.floor(Math.random() * terms.length)]);
      }

      generateAnswers(num);

      setQuestions(new Array(num).fill(""));
      setStartExam(true);
      return;
    }
    ref.current.value = "You did not enter a number";
  }

  function setAnswer(e) {
    let array = [...questions];
    array[e.target.id] = e.target.value;
    setQuestions([...array]);
  }

  function generateAnswers(num) {
    var arr = new Array(num).fill("");
    var counter = 0;
    while (arr.includes("")) {
      var r = Math.floor(Math.random() * num) ;
      arr[r] = r
      console.log(arr);
      if (counter > 20) {
        break;
      }
    }
    console.log(arr)

    var tmp, current, top = arr.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = arr[current];
    arr[current] = arr[top];
    arr[top] = tmp;
  }
    console.log(arr);
    setAnswerChoices(arr);
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
    let num = score * 10 || 0;
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
                </li>
              );
            })}
          </ul>
          <ul>
            <input type="text" onChange={setAnswer} />
            {answerChoices.map((value, key) => {
              console.log(data);
              return (
                <li key={key}>
                  <p>{data[value].author} </p>
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
              setExamSubmitted(false);
              setStartExam(false);
            }}
          >
            Setup Exam
          </button>
        </div>
      ) : (
        <div>
          <h3>How many questions?</h3>
          <input type="text" ref={ref} />
          <button onClick={setupQuiz}>Setup Exam</button>
        </div>
      )}
    </MatchingWrapper>
  );
}
