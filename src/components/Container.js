import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Home";
import SimpleQuiz from "./SimpleQuiz";
import Header from './Header';
import FillInBlankQuiz from "./FillInBlankQuiz";
import Matching from './Matching';
import CrosswordPuzzle from "./crossword/CrosswordPuzzle";

const ContainerWrapper = styled.div`
  height: 100vh;
  margin: 0 auto;
`;

export default function Container() {
  return (
    <ContainerWrapper>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/quiz">
            <SimpleQuiz />
          </Route>
          <Route path="/fillInBlank">
            <FillInBlankQuiz />
          </Route>
          <Route path="/matching">
            <Matching />
          </Route>
          <Route path="/crossword">
            <CrosswordPuzzle />
          </Route>
        </Switch>
      </Router>
    </ContainerWrapper>
  );
}
