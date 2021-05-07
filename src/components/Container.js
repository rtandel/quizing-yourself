import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Home";
import SimpleQuiz from "./SimpleQuiz";
import Header from './Header';
import Matching from "./Matching";


const ContainerWrapper = styled.div`
  width: 600px;
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
          <Route path="/matching">
            <Matching />
          </Route>
        </Switch>
      </Router>
    </ContainerWrapper>
  );
}
