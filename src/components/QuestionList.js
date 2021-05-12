import React from 'react';


export default function QuestionList({ list }) {
    return (
        <ol>
              {list.map((value, key) => {
                return (
                  <li  key={key}>
                    <p>{value.quote} </p>
                  </li>
                );
              })}
            </ol>
    )
}