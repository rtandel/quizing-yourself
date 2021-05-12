import React, { useRef } from 'react';

export default function QuizStart({ setupQuiz }) {
    const ref = useRef();
    return (
        <div>
          <h3>How many questions?</h3>
          <input type="text" ref={ref} />
          <button onClick={() => setupQuiz(ref.current.value)}>Setup Exam</button>
        </div>
    )
}