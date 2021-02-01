import "./App.css";
import styled from "styled-components";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import { AccountBox } from "./components/accountBox";
import { LoginForm } from './components/accountBox/loginForm'
import { SignupForm } from './components/accountBox/signupForm'
import { Home } from "./components/body/Home";
import Board from "./components/board/Board";
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    // <BrowserRouter>
    <AppContainer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/accounts" component={AccountBox} />
        <Route path="/board" component={Board} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </AppContainer>
    // </BrowserRouter>
  );
}

export default App;
