import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const HeaderWrapper = styled.header`
  background-color: #404e68;
  color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;


  & h1 {
    padding: 0;
    margin: 0;
    margin-left: 10px;
  }

  & a {
      color: #000;
      padding: 15px;
      background-color: #F03F06;
      margin-right: 10px;
  }

  & .selected {
    color: #fff;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <h1>Quiz Yourself</h1>
      <div>
        <NavLink activeClassName="selected" exact to="/">
          Home
        </NavLink>{" "}
        <NavLink activeClassName="selected" to="/quiz">
          Quiz
        </NavLink>
        <NavLink activeClassName="selected" to="/matching">
          Matching
        </NavLink>
      </div>
    </HeaderWrapper>
  );
}
