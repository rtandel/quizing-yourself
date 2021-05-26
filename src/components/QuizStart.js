import React, { useRef } from 'react';

export default function QuizStart({ setupQuiz }) {
    const ref = useRef();

    function change(val) {
      ref.current.value = val.target.value;
    }

    function start() {
      let num = Number.parseInt(ref.current.value);
      if (!isNaN(num)) {
        setupQuiz(num);
      } else {
        ref.current.value = "You didn't enter a number"
      }
    }

    return (
        <div>
          <h3>How many questions?</h3>
          <input type="text" ref={ref} onChange={change} />
          <button onClick={start}>Setup Exam</button>
        </div>
    )
}