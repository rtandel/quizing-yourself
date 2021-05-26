import React, { useState, useRef } from "react";
import styled from "styled-components";
import QuestionList from "./QuestionList";
import quotes from "../quotes";
import QuizStart from "./QuizStart";

const QuizWrapper = styled.ol`
  padding: 0;
  list-style-type: none;
`;

const QuestionWrapper = styled.li`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

let terms = quotes.quotes;

const MatchingWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
`;

export default function Matching({ items }) {
  const [questions, setQuestions] = useState([]);
  const [answerChoices, setAnswerChoices] = useState([]);
  const [examStarted, setStartExam] = useState(false);
  const [answersEntered, setAnswersEntered] = useState();
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  function setupQuiz(num) {
    let arr = [];
    if (!isNaN(num)) {
      for (let i = 0; i < num; i++) {
        arr.push(terms[Math.floor(Math.random() * terms.length)]);
      }

      generateAnswers(num);
      setAnswersEntered(new Array(num).fill(""));
      setQuestions([...arr]);
      setStartExam(true);
      return;
    }
  }

  function setAnswer(e) {
    let array = [...answersEntered];
    let num = Number.parseInt(e.target.value);
    if (!isNaN(num)) {
      array[e.target.id] = e.target.value - 1;
      setAnswersEntered([...array]);
      console.log(answersEntered);
    } else {
      e.target.value = "";
    }
  }

  function generateAnswers(num) {
    var arr = new Array(num).fill("");
    var counter = 0;
    while (arr.includes("")) {
      var r = Math.floor(Math.random() * num);
      arr[r] = r;
      if (counter > 20) {
        break;
      }
    }

    var tmp,
      current,
      top = arr.length;
    if (top)
      while (--top) {
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
    for (let i = 0; i < answersEntered.length; i++) {
      if (
        answersEntered[i] > questions.length ||
        answersEntered[i] < 0 ||
        !questions[answersEntered[i]]
      ) {
        continue;
      }
      if (
        questions[answersEntered[i]].quote == questions[answerChoices[i]].quote
      ) {
        score++;
      }
    }
    setExamSubmitted(true);
    setScore(score);
  }

  function getGrade() {
    let num = (score / questions.length) * 100 || 0;
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
      <h2>
        Match each quote to their authors. Type the quote's number in the box.
      </h2>
      {examStarted ? (
        <div>
          <div className="quiz">
            <QuizWrapper>
              {answerChoices.map((value, key) => {
                return (
                  <QuestionWrapper key={key}>
                    <div>
                      <p>
                        {key + 1}. {questions[value].quote}{" "}
                      </p>
                    </div>
                    <div>
                      <p>{questions[value].author} </p>
                      <input type="text" onChange={setAnswer} id={key} />
                    </div>
                  </QuestionWrapper>
                );
              })}
            </QuizWrapper>
          </div>
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
