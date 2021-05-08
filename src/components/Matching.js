import React, { useState } from 'react';
import styled from 'styled-components';

import quotes from "../quotes";

let terms = quotes.quotes;
let data = []

for (let i = 0; i < 10; i++) {
    data.push(terms[Math.floor(Math.random() * terms.length)])
}
console.log(data);

const MatchingWrapper = styled.div`

`;

export default function Matching({items}) {

    const [questions, setQuestions] = useState(new Array(10).fill(''));
    const [examSubmitted, setExamSubmitted] = useState(false); 
    const [score, setScore] = useState(0);

    function setAnswer(e) {
        let array = [...questions]
        array[e.target.id] = e.target.value
        setQuestions([...array]);
    }

    function submitExam() {
        let score = 0;
        for (let i = 0; i < questions.length; i++ ) {
            if (questions[i].toLowerCase() === data[i].author.toLowerCase()) {
                score++
            }
        }
        setExamSubmitted(true);
        setScore(score);
    }

    function getGrade() {
        let num = score * 10 || 0;
        if (num < 60) {
            return 'F';
        } else if (num < 70) {
            return 'D'
        } else if (num < 80) {
            return 'C';
        } else if (num < 90) {
            return 'B';
        } else {
            return 'A'
        }
    }

    return (
        <MatchingWrapper>
            <ul>
                {data.map((value, key) => {
                    return (
                        <li key={key}>
                            <input type="text" onChange={setAnswer} id={key}/>
                            <p>{value.quote} </p>
                        </li>
                    )
                })}
            </ul>
            {examSubmitted ? <h1>You scored {score} out of {questions.length}, Grade {getGrade()}</h1>: null}

            <button onClick={submitExam}>Submit Exam</button>
        </MatchingWrapper>
    )

}